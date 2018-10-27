const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js')

const Shares = function () {
  this.apiData = {}
  this.internalItems = [];
  this.internalRequest = new Request('/api/shares');
};

Shares.prototype.bindEvents = function () {
  PubSub.subscribe('SharesPortfolio:internal-api-list-ready', (event) => {
    const sharesItems = event.detail;
    const totalCost = this.calculatePortfolioCost(sharesItems);
    PubSub.publish('SharesPortfolio:total-cost-ready',totalCost);
});
};


  Shares.prototype.getApiData = function () {
    const request1 = new Request("https://api.iextrading.com/1.0/stock/aapl/price");
    request1.get().then((price) => {
      this.apiData.price = price});
    const request2 = new Request("https://api.iextrading.com/1.0/stock/aapl/quote");
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
    const request3 = new Request("https://api.iextrading.com/1.0/stock/aapl/stats");
    request3.get().then((stats) => {
      this.apiData.consensusEPS = stats.consensusEPS
      this.apiData.dividendYield = stats.dividendYield
      this.apiData.exDividendDate = stats.exDividendDate});
    const request4 = new Request("https://api.iextrading.com/1.0/stock/aapl/company");
    request4.get().then((company) => {
      this.apiData.CEO = company.CEO
      this.apiData.companyName = company.companyName
      this.apiData.industry = company.industry
      this.apiData.sector = company.sector
      this.apiData.website = company.website});
    const request5 = new Request("https://api.iextrading.com/1.0/stock/aapl/relevant");
    request5.get().then((peer) => {
      this.apiData.symbols = peer.symbols});
    const request6 = new Request("https://api.iextrading.com/1.0/stock/aapl/logo");
    request6.get().then((logo) => {
      this.apiData.logo = logo.url});
    PubSub.publish('Shares:api-data-ready', this.apiData);
    // console.log(this.apiData);
};

  Shares.prototype.getChartData = function () {
  const request = new Request("https://api.iextrading.com/1.0/stock/aapl/chart/1y");
  request.get().then((chart) => {
    this.chart = chart
    PubSub.publish('Shares:chart1y-data-ready', chart)
    // console.log(chart);
  });
};

  Shares.prototype.getSymbolData = function () {
  const request = new Request("https://api.iextrading.com/1.0/ref-data/symbols");
  request.get().then((symbol) => {
    this.symbol = symbol
    PubSub.publish('Shares:symbol-data-ready', symbol)
    // console.log(symbol);
  });
};

////  INTERNAL API
Shares.prototype.getInternalSharesData = function () {
  this.internalRequest
    .get()
    .then((listSharesItems) => {
      this.internalItems = listSharesItems;
      PubSub.publish('SharesPortfolio:internal-api-list-ready', this.internalItems);
    })
    .catch((error) => console.error(error));
};

Shares.prototype.calculatePortfolioCost = function (sharesItems) {
    var total_cost = 0;
    sharesItems.forEach((item) => {
      total_cost += item.n_of_shares*item.cost_per_share;
    });
    return total_cost;
};


module.exports = Shares;
