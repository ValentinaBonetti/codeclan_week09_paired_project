const PubSub = require('../helpers/pub_sub.js');
const SummaryView = function (element) {
  this.element = element;
}

SummaryView.prototype.bindEvents = function () {
  PubSub.subscribe('SharesPortfolio:total-cost-ready', (event) => {
    const totalCost = event.detail;
    const totalValueHeader = document.createElement('h3');
    totalValueHeader.textContent = 'total cost: ' + totalCost;
    this.element.appendChild(totalValueHeader);
  });
  PubSub.subscribe('SharesPortfolio:current-total-value-ready',(event) => {
    const currentTotalValue = event.detail;
    const currentTotalValueHeader = document.createElement('h3');
    currentTotalValueHeader.textContent = 'total current value: ' + currentTotalValue;
    this.element.appendChild(currentTotalValueHeader);
  });
};

module.exports = SummaryView;
