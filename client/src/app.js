const Shares = require ('./models/shares_portfolio.js');
const NavView = require('./views/nav_view.js');
const ListAllMySharesView = require('./views/list_all_my_shares_view.js');
const SelectViewAuto = require('./views/select_view_auto.js');
const SummaryView = require('./views/summary_view.js');
const ShareItemView = require('./views/share_item_view.js');
const DashboardView = require('./views/dashboard_view.js');

document.addEventListener('DOMContentLoaded', () => {

  const nav_bar = document.querySelector('#nav-bar');
  const navView = new NavView(nav_bar);
  navView.bindEvents();

  const summary_view = document.querySelector('#summary-view');
  const summaryView = new SummaryView(summary_view);
  summaryView.bindEvents();

  const dashboard_view = document.querySelector('div#central-container');
  const dashboardView = new DashboardView(dashboard_view);
  dashboardView.bindEvents();

  const list_all_shares = document.querySelector('div#central-container');
  const listAllMySharesView = new ListAllMySharesView(list_all_shares);
  listAllMySharesView.bindEvents();

  const individual_share = document.querySelector('div#central-container');
  const shareItemView = new ShareItemView(individual_share);
  shareItemView.bindEvents();


  const selectElementAuto = document.querySelector('input#myInput');
  const selectViewAuto = new SelectViewAuto(selectElementAuto);
  selectViewAuto.bindEvents();

  const shares = new Shares();
  shares.bindEvents();
  shares.getSymbolData();
  // getInternalSharesData publishes the static DB data
  shares.getInternalSharesData();

});
