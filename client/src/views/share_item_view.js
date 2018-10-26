const PubSub = require('../helpers/pub_sub.js');

const ShareItemView = function(item) {
  this.item = item;
  this.element = null;
};

ShareItemView.prototype.createShareLi = function () {
  const li = document.createElement('li');
};
