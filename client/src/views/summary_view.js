const PubSub = require('../helpers/pub_sub.js');
const SummaryView = function (element) {
  this.element = element;
}

SummaryView.prototype.bindEvents = function () {
  PubSub.subscribe('SharesPortfolio:total-cost-ready', (event) => {
    const totalCost = event.detail;
    console.log('total cost from summary:',totalCost);

    const totalHeader = document.createElement('h3');
    totalHeader.textContent = 'total cost: ' + totalCost;
    this.element.appendChild(totalHeader);
});
};

module.exports = SummaryView;
