const PubSub = require('../helpers/pub_sub.js');
const DashboardView = function (element) {
  this.element = element;
}

DashboardView.prototype.bindEvents = function () {
  const test = document.createElement('h1');
  test.textContent = 'test';
  this.element.appendChild(test);
};

module.exports = DashboardView;
