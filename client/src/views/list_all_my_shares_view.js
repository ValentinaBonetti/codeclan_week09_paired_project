const PubSub = require('../helpers/pub_sub.js');
const tableify = require('tableify');

const ListAllMySharesView = function (listElement) {
  this.element = listElement;

};

ListAllMySharesView.prototype.bindEvents = function () {

  PubSub.subscribe('SharesPortfolio:internal-api-list-ready', (event) => {
    const sharesItems = event.detail;
    PubSub.subscribe('SharesPortfolio:allPortfolioExtenalApiData-ready', (event) => {
      const sharesItemsExtenalInfo = event.detail;
      PubSub.subscribe('NavView:my-shares-button-clicked', (event) => {
        this.renderList(sharesItems,sharesItemsExtenalInfo);
      });
      // PubSub.subscribe('SharesPortfolio:internal-api-list-updated', (event) => {
      //   const updatedSharesItems = event.detail;
      //   this.renderList(updatedSharesItems,sharesItemsExtenalInfo);
      // })
    });
  });
};

ListAllMySharesView.prototype.renderList = function (sharesItems,sharesItemsExternalInfo) {
  this.emptyList();
  // select fields that you want to render in table and put in array:
  const sharesRefinedItems = this.selectTableFields(sharesItems,sharesItemsExternalInfo);
  // items.forEach((item) => this.renderItem(item));
  // otherwise this one returns everything in db, including _id:
  this.buildTable(sharesRefinedItems);
};

ListAllMySharesView.prototype.emptyList = function () {
  this.element.innerHTML = '';
};

ListAllMySharesView.prototype.selectTableFields = function (sharesItemsArray,sharesItemsExtenalInfoArray) {
  const allRefinedItems = new Array();
  console.log('sharesItemsArray:',sharesItemsArray);
  console.log('sharesItemsExtenalInfoArray:',sharesItemsExtenalInfoArray);
  sharesItemsArray.forEach(function(localItem) {
    // add what you want to show in table view:
    var refinedItem = {};
    refinedItem.Name = localItem.name;
    refinedItem.Symbol = localItem.symbol.toUpperCase();
    // refinedItem.currency = localItem.currency;
    refinedItem.Number = localItem.n_of_shares;
    refinedItem['Purchase price'] = localItem.cost_per_share;
    // refinedItem.cost = Math.round(localItem.cost_per_share*localItem.n_of_shares);
    var found = sharesItemsExtenalInfoArray.find((share) => share.symbol === localItem.symbol);
    refinedItem['Current price'] = found.price;
    refinedItem['Value'] = Math.round(found.price*localItem.n_of_shares);
    refinedItem['Gain/(loss)'] = Math.round(found.price*localItem.n_of_shares-(localItem.cost_per_share*localItem.n_of_shares));
    // Unsuccessful attempt to put a sell button in the last column:
    // var sellButton = document.createElement('button');
    // sellButton.id = refinedItem.symbol;
    // var button_div = document.querySelector(`#${refinedItem.symbol}`);
    // //  sellButton.textContent = "sell";
    // button_div.appendChild(sellButton);
    // refinedItem.sell = button_div;
    allRefinedItems.push(refinedItem);
  });
  return allRefinedItems;
};


ListAllMySharesView.prototype.buildTable = function (items) {
  var html = tableify(items);
  var htmlNode = document.createElement('div');
  htmlNode.id = 'internal-api-table-container';
  htmlNode.innerHTML = html;
  this.element.appendChild(htmlNode);
};


// This tryOutTable function is just to test tableify functionality.
// Use it in bindEvents to try out; delete it at the end of development.
ListAllMySharesView.prototype.tryOutTable = function () {
  var html = tableify({
      someArrayOfObjects : [
          { name : 1, b : 2, c : 3  }
          , { a : 2, b : 3, c : 4 }
          , { a : 3, b : 4, c : 5 }
      ]
      , someObject : {
          key1 : 'value1'
          , someArray : [
              'value2'
              , 'value3'
              , 'value4'
              , 'value5'
          ]
          , someArrayOfObjects : [
              { key2 : 123 }
              , { key2 : 234 }
              , { key2 : 345 }
          ]
      }
  });
  var htmlNode = document.createElement('div');
  // the following line is needed because otherwise html is just a string
  // and appendChild does not work.
  htmlNode.innerHTML = html;
  this.element.appendChild(htmlNode);
  };

module.exports = ListAllMySharesView;
