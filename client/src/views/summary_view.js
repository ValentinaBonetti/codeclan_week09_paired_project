const PubSub = require('../helpers/pub_sub.js');
const SummaryView = function (element) {
  this.element = element;
}

SummaryView.prototype.bindEvents = function () {

  PubSub.subscribe('SharesPortfolio:total-cost-ready', (event) => {

    const totalCost = event.detail;
    const key = 'cost';
    const string = 'total cost: ';
    this.render(key,string,totalCost);

    // const totalValueHeader = document.createElement('h4');
    // totalValueHeader.textContent = 'total cost: ' + totalCost.toPrecision(6);
    // this.element.appendChild(totalValueHeader);

  });
  PubSub.subscribe('SharesPortfolio:current-total-value-ready',(event) => {

    const currentTotalValue = event.detail;
    const key = 'value';
    const string = 'total current value: ';
    this.render(key,string,currentTotalValue);

    // const currentTotalValueHeader = document.createElement('h4');
    // currentTotalValueHeader.textContent = 'total current value' + currentTotalValue.toPrecision(6);
    // this.element.appendChild(currentTotalValueHeader);

  });
  PubSub.subscribe('SharesPortfolio:todayTotalGain-ready',(event) => {

    const todayTotalGain = event.detail;
    const key = 'gain';
    const string = 'todays gains: ';
    this.render(key,string,todayTotalGain);

    // const todayTotalGainHeader = document.createElement('h4');
    // todayTotalGainHeader.textContent = 'todays gain: ' + todayTotalGain.toPrecision(5);
    // this.element.appendChild(todayTotalGainHeader);
  });
};

SummaryView.prototype.render = function (key,string,data) {
  var dataHeader = '';
  const queryElement = `h4#${key}`;
  if(document.querySelector(queryElement)) {
    dataHeader = document.querySelector(queryElement);
    dataHeader.innerHTML = "";
  } else {
    dataHeader = document.createElement('h4');
    dataHeader.id = key;
  };
  dataHeader.textContent = string + data.toPrecision(4);
  this.element.appendChild(dataHeader);
};

module.exports = SummaryView;
