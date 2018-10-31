const Shares = require ('./models/shares_portfolio.js');
const NavView = require('./views/nav_view.js');
const ListAllMySharesView = require('./views/list_all_my_shares_view.js');
const SelectViewAuto = require('./views/select_view_auto.js');
const SummaryView = require('./views/summary_view.js');
const ShareItemView = require('./views/share_item_view.js');
const DashboardView = require('./views/dashboard_view.js');
const BuyAndSellView = require('./views/buy_and_sell_view.js');

document.addEventListener('DOMContentLoaded', () => {

  event.preventDefault();
  
  const nav_bar = document.querySelector('#nav-bar');
  const navView = new NavView(nav_bar);
  navView.bindEvents();

  const summary_view = document.querySelector('#summary-view');
  const summaryView = new SummaryView(summary_view);
  summaryView.bindEvents();

  const central_container = document.querySelector('div#central-container');

  const dashboardView = new DashboardView(central_container);
  dashboardView.bindEvents();

  const listAllMySharesView = new ListAllMySharesView(central_container);
  listAllMySharesView.bindEvents();

  const shareItemView = new ShareItemView(central_container);
  shareItemView.bindEvents();

  const buyAndSellView = new BuyAndSellView(central_container);
  buyAndSellView.bindEvents();

  const selectElementAuto = document.querySelector('input#myInput');
  const selectViewAuto = new SelectViewAuto(selectElementAuto);
  selectViewAuto.bindEvents();

  const shares = new Shares();
  shares.bindEvents();
  shares.getSymbolData();
  // getInternalSharesData publishes the static DB data
  shares.getInternalSharesData();

});
