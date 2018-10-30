const PubSub = require('../helpers/pub_sub.js');

const NavView = function (element) {
  this.element = element;
}

NavView.prototype.bindEvents = function () {
  const my_shares_button = document.querySelector('#my-shares-button');
  my_shares_button.addEventListener('click', () => {
    PubSub.publish('NavView:my-shares-button-clicked', my_shares_button.value);
  });
  const dashboard_button = document.querySelector('#dashboard-button');
  dashboard_button.addEventListener('click', () => {
    PubSub.publish('NavView:dashboard-button-clicked', dashboard_button.value);
  });
  const market_button = document.querySelector('#market-button');
  market_button.addEventListener('click', () => {
    PubSub.publish('NavView:market-button-clicked', market_button.value);
  })
};



module.exports = NavView;
