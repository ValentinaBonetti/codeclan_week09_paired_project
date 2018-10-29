const Shares = require ('./models/shares_portfolio.js');
const ListAllMySharesView = require('./views/list_all_my_shares_view.js');
// const SelectView = require('./views/select_view.js');
const SelectViewAuto = require('./views/select_view_auto.js');
const SummaryView = require('./views/summary_view.js');

document.addEventListener('DOMContentLoaded', () => {

  const summary_view = document.querySelector('#summary-view');
  const summaryView = new SummaryView(summary_view);
  summaryView.bindEvents();

  const list_all_shares = document.querySelector('div#list_all_shares');
  const listAllMySharesView = new ListAllMySharesView(list_all_shares);
  listAllMySharesView.bindEvents();

  // const selectElement = document.querySelector('select#sharesName');
  // const selectView = new SelectView(selectElement);
  // selectView.bindEvents();

  const selectElementAuto = document.querySelector('input#myInput');
  const selectViewAuto = new SelectViewAuto(selectElementAuto);
  selectViewAuto.bindEvents();

  const shares = new Shares();
  shares.bindEvents();
  shares.getSymbolData();
  // getInternalSharesData publishes the static DB data 
  shares.getInternalSharesData();

});
