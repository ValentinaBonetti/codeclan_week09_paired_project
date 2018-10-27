const Shares = require ('./models/shares_portfolio.js');
const ListAllMySharesView = require('./views/list_all_my_shares_view.js');
const SelectView = require('./views/select_view.js');


document.addEventListener('DOMContentLoaded', () => {

  const list_all_shares = document.querySelector('div#list_all_shares');
  const listAllMySharesView = new ListAllMySharesView(list_all_shares);
  listAllMySharesView.bindEvents();

  const selectElement = document.querySelector('select#sharesName');

  const selectView = new SelectView(selectElement);
  selectView.bindEvents();


  const shares = new Shares();
  shares.getSymbolData();
  shares.getInternalSharesData();
});
