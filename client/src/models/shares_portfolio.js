const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js')

const Shares = function () {
  this.internalItems = [];
  this.internalRequest = new Request('/api/shares');
};

  Shares.prototype.getQuoteData = function () {
  const request = new Request("https://api.iextrading.com/1.0/stock/aapl/quote");
  request.get().then((quote) => {
    this.quote = quote
  console.log(this.quote);
    PubSub.publish('Share:share-data-ready', quote)
  });
};

  Shares.prototype.getCompanyData = function () {
  const request = new Request("https://api.iextrading.com/1.0/stock/aapl/company");
  request.get().then((company) => {
    this.company = company
console.log(this.company);
    PubSub.publish('Company:company-data-ready', company)
  });
};

  Shares.prototype.getSymbolData = function () {
  const request = new Request("https://api.iextrading.com/1.0/stock/aapl/chart/1y");
  request.get().then((symbol) => {
    this.symbol = symbol
  console.log(this.symbol);
    PubSub.publish('Company:company-data-ready', symbol)
  });
};

Shares.prototype.getChartData = function () {
const request = new Request("https://api.iextrading.com/1.0/ref-data/symbols");
request.get().then((chart) => {
  this.chart = chart
console.log(this.chart);
  PubSub.publish('Company:company-data-ready', chart)
});
};


// Shares.prototype.extend = function (obj, src) {
//   for (var key in src) {
//       if (src.hasOwnProperty(key)) obj[key] = src[key];
//   }
//   return obj;


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

module.exports = Shares;
