const PubSub = require('../helpers/pub_sub.js');
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
  test.textContent = 'dashboard view';
  this.element.appendChild(test);
};



module.exports = DashboardView;
