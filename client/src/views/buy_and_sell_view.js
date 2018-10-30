const PubSub = require('../helpers/pub_sub.js');
const BuyAndSellView = function (element) {
  this.element = element;
}

BuyAndSellView.prototype.bindEvents = function () {
  PubSub.subscribe('NavView:market-button-clicked', () => {
    this.renderSellAShareFromPortfolio();
  })
  PubSub.subscribe('ShareItemView:buy-botton-clicked', (event) => {
    const shareObject = event.detail;
    this.renderBuyAShare(shareObject);
  })
};


BuyAndSellView.prototype.renderSellAShareFromPortfolio = function () {
  this.element.innerHTML='';
  const temporary = document.createElement('h1');
  temporary.textContent = 'market view - sell a share from your portfolio';
  this.element.appendChild(temporary);
};

BuyAndSellView.prototype.renderBuyAShare = function (shareObject) {

};

module.exports = BuyAndSellView;
