const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js')

const Shares = function () {
  this.apiData = {};
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
      const totalGain = this.calculateTotalTodayGain(sharesItems);
      })

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

    const selectedShare = symbols.find(selected => selected.name === shareName);
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
    // console.log(symbol);
    const request1 = new Request(`https://api.iextrading.com/1.0/stock/${symbol}/price`);    request1.get().then((price) => {
      this.apiData.price = price});
    const request2 = new Request(`https://api.iextrading.com/1.0/stock/${symbol}/quote`);
    request2.get().then((quote) => {
      this.apiData.avgTotalVolume = quote.avgTotalVolume;
      this.apiData.change = quote.change;
      this.apiData.changePercent = quote.changePercent;
      this.apiData.close = quote.close;
      this.apiData.companyName = quote.companyName;
      this.apiData.latestVolume = quote.latestVolume;
      this.apiData.marketCap = quote.marketCap;
      this.apiData.peRatio = quote.peRatio;
      this.apiData.previousClose = quote.previousClose;
      this.apiData.primaryExchange = quote.primaryExchange;
      this.apiData.symbol = quote.symbol
      this.apiData.week52High = quote.week52High
      this.apiData.week52Low = quote.week52Low});
    const request3 = new Request(`https://api.iextrading.com/1.0/stock/${symbol}/stats`);
    request3.get().then((stats) => {
      this.apiData.consensusEPS = stats.consensusEPS
      this.apiData.dividendYield = stats.dividendYield
      this.apiData.exDividendDate = stats.exDividendDate});
    const request4 = new Request(`https://api.iextrading.com/1.0/stock/${symbol}/company`);
    request4.get().then((company) => {
      this.apiData.CEO = company.CEO
      this.apiData.companyName = company.companyName
      this.apiData.industry = company.industry
      this.apiData.sector = company.sector
      this.apiData.website = company.website});
    const request5 = new Request(`https://api.iextrading.com/1.0/stock/${symbol}/relevant`);
    request5.get().then((peers) => {
      this.apiData.peers = peers.symbols});
    const request6 = new Request(`https://api.iextrading.com/1.0/stock/${symbol}/logo`);
    request6.get().then((logo) => {
      this.apiData.logo = logo.url});

    PubSub.publish('Shares:api-data-ready', this.apiData);
    // console.log('this api data:',this.apiData);
    // debugger;
    return this.apiData;
};

// Price data for 1 year for specific share
  Shares.prototype.getChartData = function (symbol) {
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
Shares.prototype.calculateIndividualTodayGain = function (symbol) {
  var today_share_gain = 0;
  const allSymbolInfo = this.getIndividualApiData(symbol);
  today_share_gain = allSymbolInfo.price - allSymbolInfo.previousClose;
  // debugger;
  console.log('today share gain =',today_share_gain);
  return today_share_gain;
};

// Calculate total today's shares gain
Shares.prototype.calculateTotalTodayGain = function (sharesItems) {
  var today_total_gain = 0;
  sharesItems.forEach((item) => {
    today_total_gain += this.calculateIndividualTodayGain(item.symbol);
  });
  console.log('today total gain =',today_total_gain);
  return today_total_gain;
};


module.exports = Shares;
