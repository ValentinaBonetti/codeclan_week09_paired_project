const PubSub = require('../helpers/pub_sub.js');

const tableify = require('tableify');

const ListAllMySharesView = function (listElement) {
  this.element = listElement;
};


ListAllMySharesView.prototype.bindEvents = function () {

  this.tryOutTable();

  // PubSub.subscribe('SharesList:list-ready', (event) => {
  //   const sharesItems = event.detail;
  //   this.renderList(sharesItems);
  // });
};

ListAllMySharesView.prototype.renderList = function (items) {
  this.emptyList();
  items.forEach((items) => this.renderItem(item));
};

ListAllMySharesView.prototype.emptyList = function () {
  this.element.innerHTML = '';
};

ListAllMySharesView.prototype.renderItem = function (item) {
  const listItemView = new ListView
};

ListAllMySharesView.prototype.tryOutTable = function () {
  var html = tableify({
      someArrayOfObjects : [
          { a : 1, b : 2, c : 3  }
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
  htmlNode.innerHTML = html;
  this.element.appendChild(htmlNode);

  };


module.exports = ListAllMySharesView;
