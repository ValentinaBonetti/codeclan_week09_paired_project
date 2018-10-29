// const Shares = require ('./models/shares_portfolio.js');
const dateFormat = require('dateformat');
const PubSub = require('../helpers/pub_sub.js');
const ShareItemView = function(container) {
  this.container = container;
};

ShareItemView.prototype.bindEvents = function () {
  PubSub.subscribe('Shares:api-data-ready', (event) => {
    console.log('API data passed to ShareItemView', event.detail);

    const share = event.detail
    this.renderView(share);
  })
};

ShareItemView.prototype.clearView = function () {
  this.container.innerHTML = '';
};

ShareItemView.prototype.renderView = function (share) {
  this.clearView();
  const shareItem = document.createElement('div');
  shareItem.classList.add('divShare-item');
  this.container.appendChild(shareItem)

  const shareName = document.createElement('h3');
  shareName.textContent = `${share.companyName}`;
  shareItem.appendChild(shareName);

  const shareLogo = document.createElement('img')
  shareLogo.src = share.logo;
  shareLogo.alt = share.companyName;
  shareLogo.classList.add("logo");
  shareItem.appendChild(shareLogo)

  const divExchSymb = document.createElement('div');
  divExchSymb.classList.add('divExchSymb');
  shareItem.appendChild(divExchSymb);

  const shareExchangeSymbol = document.createElement('p');
  shareExchangeSymbol.textContent = `${share.primaryExchange} :    ${share.symbol}`;
  divExchSymb.appendChild(shareExchangeSymbol);

  const divPriceBlock = document.createElement('div');
  divPriceBlock.classList.add('divPriceBlock');
  shareItem.appendChild(divPriceBlock);

  const divPrice = document.createElement('div');
  divPrice.classList.add('divPrice');
  divPriceBlock.appendChild(divPrice);

  const sharePrice = document.createElement('h1');
  sharePrice.textContent = `${share.price}`;
  divPrice.appendChild(sharePrice);

  const divPriceMov = document.createElement('div');
  divPriceMov.classList.add('divPriceMov');
  divPriceBlock.appendChild(divPriceMov);

  const sharePriceMov = document.createElement('h3');
  sharePriceMov.textContent = `${share.change} ${Math.round(share.changePercent*10000)/100}%`;
  divPriceMov.appendChild(sharePriceMov);

  const divFundamentals = document.createElement('div');
  divFundamentals.classList.add('divFundamentals');
  shareItem.appendChild(divFundamentals);

  const divFundamentals1 = document.createElement('div');
  divFundamentals1.classList.add('divFundamentals1');
  divFundamentals.appendChild(divFundamentals1);

  const sharePreviousClose = this.createDetail('Previous Close : ',share.previousClose);
  divFundamentals1.appendChild(sharePreviousClose);

  const shareWeek52High = this.createDetail('52 Week High : ',share.week52High);
  divFundamentals1.appendChild(shareWeek52High);

  const shareWeek52Low = this.createDetail('52 Week Low : ',share.week52Low);
  divFundamentals1.appendChild(shareWeek52Low);

  const shareLatestVolume = this.createDetail('Volume : ',share.latestVolume);
  divFundamentals1.appendChild(shareLatestVolume);

  const shareAvgTotalVolume = this.createDetail('Avg. Volume : ',share.avgTotalVolume);
  divFundamentals1.appendChild(shareAvgTotalVolume);

  const divFundamentals2 = document.createElement('div');
  divFundamentals2.classList.add('divFundamentals1');
  divFundamentals.appendChild(divFundamentals2);

  const shareMarketCap = this.createDetail('Market Cap : ',share.marketCap);
  divFundamentals2.appendChild(shareMarketCap);

  const sharePeRatio = this.createDetail('PE Ratio : ',share.peRatio);
  divFundamentals2.appendChild(sharePeRatio);

  const shareEPS = this.createDetail('EPS : ',share.consensusEPS);
  divFundamentals2.appendChild(shareEPS);

  const shareDividendYield = this.createDetail('Dividend Yield : ',`${Math.round(share.dividendYield*100)/100}%`);
  divFundamentals2.appendChild(shareDividendYield);

  const shareExDividendDate = this.createDetail('Ex-Dividend Date : ',dateFormat(share.exDividendDate,"shortDate"));
  divFundamentals2.appendChild(shareExDividendDate);

  const divDescription = document.createElement('div');
  divDescription.classList.add('divDescription');
  shareItem.appendChild(divDescription);

  const shareDescription = document.createElement('p');
  shareDescription.textContent = `${share.description}`;
  divDescription.appendChild(shareDescription);

  const divStats = document.createElement('div');
  divStats.classList.add('divStats');
  shareItem.appendChild(divStats);

  const divStats1 = document.createElement('div');
  divStats1.classList.add('divStats1');
  divStats.appendChild(divStats1);

  const shareCEO = this.createDetail('CEO : ',share.CEO);
  divStats1.appendChild(shareCEO);

  const shareSector = this.createDetail('Sector : ',share.sector);
  divStats1.appendChild(shareSector);

  const shareIndustry = this.createDetail('Industry : ',share.industry);
  divStats1.appendChild(shareIndustry);

  const divStats2 = document.createElement('div');
  divStats2.classList.add('divStats2');
  divStats.appendChild(divStats2);

  const shareWebsite = this.createDetail('Website : ',share.website);
  divStats2.appendChild(shareWebsite);

  const sharePeers = this.createDetail('Peers : ',share.peers);
  divStats2.appendChild(sharePeers);

  const graphItem = document.createElement('div');
  graphItem.classList.add('divGraph-item');
  this.container.appendChild(graphItem)

  const graphButtons = document.createElement('div');
  graphButtons.classList.add('divgraphButtons');
  graphItem.appendChild(graphButtons)

  const btnBuy = document.createElement("button");
  const textBuy = document.createTextNode("BUY");
  btnBuy.appendChild(textBuy);
  graphButtons.appendChild(btnBuy);

  const btnSell = document.createElement("button");
  const textSell = document.createTextNode("SELL");
  btnSell.appendChild(textSell);
  graphButtons.appendChild(btnSell);

  const graph = document.createElement('div');
  graph.classList.add('divgraph');
  graphItem.appendChild(graph)

};

ShareItemView.prototype.createDetail = function (label, property) {
const element = document.createElement('p');
element.textContent = `${label}    ${property}`;
return element;
};


  module.exports = ShareItemView;
