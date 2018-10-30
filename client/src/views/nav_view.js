const PubSub = require('../helpers/pub_sub.js');

const NavView = function (element) {
  this.element = element;
}

NavView.prototype.bindEvents = function () {
  const my_shares_button = document.querySelector('#my-shares-button');
  my_shares_button.addEventListener('click', () => {
    PubSub.publish('NavView:my-shares-button-clicked', my_shares_button.value);
  })
};



module.exports = NavView;
