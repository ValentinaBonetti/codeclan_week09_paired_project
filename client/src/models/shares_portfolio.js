const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const Shares = function () {
  // this.apiData = {};
  this.allPortfolioExtenalApiData = [];
  this.internalItems = [];
  this.internalRequest = new Request('/api/shares');
  this.livePortfolioPrices = {};
};

Shares.prototype.bindEvents = function () {

  PubSub.subscribe('SharesPortfolio:internal-api-list-ready', (event) => {

    const sharesItems = event.detail;
    const totalCost = this.calculatePortfolioCost(sharesItems);

    PubSub.publish('SharesPortfolio:total-cost-ready',totalCost);
    this.getLivePortfolioPrices(sharesItems);

    PubSub.subscribe('SharesPortfolio:live-prices-ready', (event) => {
      const livePrices = event.detail;
      const currentTotalValue = this.calculateCurrentPortfolioValue(sharesItems,livePrices);
      PubSub.publish('SharesPortfolio:current-total-value-ready',currentTotalValue);
    });

    PubSub.subscribe('SharesPortfolio:allPortfolioExtenalApiData-ready',(event) => {
      var today_total_gain = 0;
      const portfolioArray = event.detail;
      portfolioArray.forEach((share) => {
        var share_today_gain = 0;
        share_today_gain = share.price - share.previousClose;
        today_total_gain += share_today_gain;
      });
      PubSub.publish('SharesPortfolio:todayTotalGain-ready',today_total_gain);
    });
    this.collectAllPortfolioExtenalApiData(sharesItems);
    // this.calculateTotalTodayGain(sharesItems);
  });

  PubSub.subscribe('BuyAndSellView:put-share-in-internal-db', (event) => {
    const shareToAddToDB = event.detail;
    this.add(shareToAddToDB);
  });


};

// Gets symbol data from API for all shares (an array for all shares
// containing 8,750 hashes with keys - symbol:, name:, etc).
// Subscribes for change in share name drop-down and returns selected share name.
// Finds share symbol based on selected share name, calls getAPIData and
// getChartData functions and passes the selected share symbol.
Shares.prototype.getSymbolData = function () {
  const request = new Request("https://api.iextrading.com/1.0/ref-data/symbols");
  request.get().then((summaryData) => {
    this.nameList(summaryData);
    PubSub.publish('Shares:nameList-ready', this.nameList);

    PubSub.subscribe('SelectView:change', (event) => {
    const shareName = event.detail;

    const selectedShare = summaryData.find(selected => selected.name === shareName);
    selectedSymbol = selectedShare.symbol;
    this.getIndividualApiData(selectedSymbol);
    this.getChartData(selectedSymbol);
    // console.log(this.selectedSymbol);
    });
  });
};

// Prepares array of all share names :
Shares.prototype.nameList = function (shares) {
  const nameList = shares.map(share => share.name);
  this.nameList = nameList;
};

// Individual share data from the API for a specific share
Shares.prototype.getIndividualApiData = function (symbol) {
    const apiObject = {};
    const request1 = new Request(`https://api.iextrading.com/1.0/stock/${symbol}/price`);
    const request2 = new Request(`https://api.iextrading.com/1.0/stock/${symbol}/quote`);
    const request3 = new Request(`https://api.iextrading.com/1.0/stock/${symbol}/stats`);
    const request4 = new Request(`https://api.iextrading.com/1.0/stock/${symbol}/company`);
    const request5 = new Request(`https://api.iextrading.com/1.0/stock/${symbol}/relevant`);
    const request6 = new Request(`https://api.iextrading.com/1.0/stock/${symbol}/logo`);
    return Promise.all([request1.get(), request2.get(), request3.get(), request4.get(), request5.get(),request6.get()]).then((values) => {
      apiObject.price = values[0];
      apiObject.avgTotalVolume = values[1].avgTotalVolume;
      apiObject.change = values[1].change;
      apiObject.changePercent = values[1].changePercent;
      apiObject.close = values[1].close;
      apiObject.companyName = values[1].companyName;
      apiObject.latestVolume = values[1].latestVolume;
      apiObject.marketCap = values[1].marketCap;
      apiObject.peRatio = values[1].peRatio;
      apiObject.previousClose = values[1].previousClose;
      apiObject.primaryExchange = values[1].primaryExchange;
      apiObject.symbol = values[1].symbol
      apiObject.week52High = values[1].week52High
      apiObject.week52Low = values[1].week52Low
      apiObject.priceToSales = values[2].priceToSales;
      apiObject.priceToBook = values[2].priceToBook;
      apiObject.consensusEPS = values[2].consensusEPS
      apiObject.dividendYield = values[2].dividendYield
      apiObject.exDividendDate = values[2].exDividendDate
      apiObject.CEO = values[3].CEO
      apiObject.companyName = values[3].companyName
      apiObject.description = values[3].description
      apiObject.industry = values[3].industry
      apiObject.sector = values[3].sector
      apiObject.website = values[3].website
      apiObject.peers = values[4].symbols.slice(0,5)
      apiObject.logo = values[5].url
      PubSub.publish('Shares:api-data-ready',apiObject);
      return apiObject;
    });
};

// Collect all the external API data for the portfolio:
Shares.prototype.collectAllPortfolioExtenalApiData = function (sharesItems) {
  const allPortfolioData = new Array();
  const promises = sharesItems.map(async (item) => {
    var itemData = {};
    var itemData = await this.getIndividualApiData(item.symbol);
    allPortfolioData.push(itemData)
  });
  Promise.all(promises).then(() => {
    console.log('All portfolio data:', allPortfolioData);
    PubSub.publish('SharesPortfolio:allPortfolioExtenalApiData-ready',allPortfolioData);
  });
};

// Price data for 1 year for specific share
Shares.prototype.getChartData = function (symbol) {
  const chartObject = {};
  const request = new Request(`https://api.iextrading.com/1.0/stock/${symbol}/chart/1y`);
  request.get().then((chart) => {
    PubSub.publish('Shares:chart1y-data-ready', chart)
    console.log(chart);
  });
};

// INTERNAL API
Shares.prototype.getInternalSharesData = function () {
  this.internalRequest
    .get()
    .then((listSharesItems) => {
      this.internalItems = listSharesItems;
      PubSub.publish('SharesPortfolio:internal-api-list-ready', this.internalItems);
    })
    .catch((error) => console.error(error));
};

Shares.prototype.add = function(newItem) {
  this.internalRequest
    .post(newItem)
    .then(
      (listSharesItems) => {
        this.internalItems = listSharesItems;
        PubSub.publish('SharesPortfolio:internal-api-list-ready', this.internalItems);
        // PubSub.publish('SharesPortfolio:internal-api-list-updated', this.internalItems);
      })
    .catch((err) => console.error(err));
};

// Calculates the cost of the portfolio from the internal API
Shares.prototype.calculatePortfolioCost = function (sharesItems) {
    var total_cost = 0;
    sharesItems.forEach((item) => {
      total_cost += item.n_of_shares*item.cost_per_share;
    });
    return total_cost;
};

// Live price data for shares in Internal API portfolio
Shares.prototype.getLivePortfolioPrices = function (sharesItems) {
  var portfolio = "";
  sharesItems.forEach((item) => {
    portfolio += item.symbol+",";
  });
  const request = new Request(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${portfolio}&types=price`);
  request.get().then((price) => {
    PubSub.publish('SharesPortfolio:live-prices-ready',price);
   });
};

// Calculate current value from live price data
Shares.prototype.calculateCurrentPortfolioValue = function (sharesItems,livePrices) {
  var total_value = 0;
  sharesItems.forEach((item) => {
    total_value += item.n_of_shares*livePrices[item.symbol].price;
  });
  return total_value;
};

// Calculate individual share today's gain from api data and internal db n_of_shares
Shares.prototype.calculateIndividualTodayGain = async function (symbol) {
  var today_share_gain = 0;
  const allSymbolInfo = await this.getIndividualApiData(symbol);
  today_share_gain = allSymbolInfo.price - allSymbolInfo.previousClose;
  return today_share_gain;
};

// Calculate total today's shares gain
Shares.prototype.calculateTotalTodayGain = async function (sharesItems) {
  var today_total_gain = 0;
  sharesItems.forEach(async (item) => {
    let item_gain = await this.calculateIndividualTodayGain(item.symbol);
    today_total_gain += item_gain;
  });
  return today_total_gain;
};


module.exports = Shares;
