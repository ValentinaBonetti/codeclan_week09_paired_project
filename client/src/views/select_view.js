const PubSub = require('../helpers/pub_sub');

const SelectView = function (selectElement) {
  this.selectElement = selectElement;
};

// subscribes to shareName list and publishes a change in it:
SelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Shares:nameList-ready', (event) => {
    this.populateSelect(event.detail);
  });

  this.selectElement.addEventListener('change', (event) => {
    const selectedShare = event.target.value;
    PubSub.publish('SelectView:change', selectedShare);
  });
};

// populating shareName dropdown.
SelectView.prototype.populateSelect = function (shareNames) {
  shareNames.forEach((shareName) => {
    const option = this.createShareNameOption(shareName);
    this.selectElement.appendChild(option);
  })
};

// creating shareName dropdown
SelectView.prototype.createShareNameOption = function (shareName) {
  const option = document.createElement('option');
  option.textContent = shareName;
  option.value = shareName;
  return option;
};

module.exports = SelectView;
