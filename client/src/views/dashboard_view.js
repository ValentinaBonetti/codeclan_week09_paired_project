const Shares = require ('../models/shares_portfolio.js');
const PubSub = require('../helpers/pub_sub.js');
const Chart = require('./share_item_price_graph.js');
const Chart2 = require('./dashboard_view_graph.js');

const DashboardView = function (element) {
  this.element = element;
}

DashboardView.prototype.bindEvents = function () {
  this.renderDashboard();
  PubSub.subscribe('NavView:dashboard-button-clicked', () => {
    this.renderDashboard();
  })
};

DashboardView.prototype.renderDashboard = function () {
  this.element.innerHTML='';
  const test = document.createElement('h1');
  test.textContent = '';
  this.element.appendChild(test);

  const startItems = document.createElement('div');
  startItems.classList.add('divStart');
  this.element.appendChild(startItems)

  const gainGraph = document.createElement('div');
  gainGraph.classList.add('divGainGraph');
  gainGraph.setAttribute("id","gainChart");
  startItems.appendChild(gainGraph)

  // const sHtest = document.createElement('h2');
  // sHtest.textContent = "sHtest";
  // startItems.appendChild(sHtest);

  const assetGraph = document.createElement('div');
  assetGraph.classList.add('divAssetGraph');
  assetGraph.setAttribute("id","AssetChart");
  gainGraph.appendChild(assetGraph)

  const dayGraph = document.createElement('div');
  dayGraph.classList.add('divDayGraph');
  dayGraph.setAttribute("id","dayChart");
  gainGraph.appendChild(dayGraph)


  PubSub.subscribe('SharesPortfolio:chart-gain-data-ready', (event) => {
    console.log("SH" ,event.detail);
    const gainChart = new Chart2(event.detail);
    gainChart.bindEvents();
});

};



module.exports = DashboardView;
