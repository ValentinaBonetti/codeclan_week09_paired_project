const Shares = require ('./models/shares_portfolio.js');
const ListAllMySharesView = require('./views/list_all_my_shares_view.js');
const SummaryView = require('./views/summary_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('Javascript loaded');

  const summary_view = document.querySelector('#summary-view');
  const summaryView = new SummaryView(summary_view);
  summaryView.bindEvents();

  const list_all_shares = document.querySelector('div#list_all_shares');
  const listAllMySharesView = new ListAllMySharesView(list_all_shares);
  listAllMySharesView.bindEvents();


  const shares = new Shares();
  shares.bindEvents();
  shares.getApiData();
  shares.getSymbolData();
  shares.getChartData();
  shares.getInternalSharesData();
});
