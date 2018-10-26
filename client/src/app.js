const Shares = require ('./models/shares_portfolio.js');
const ListAllMySharesView = require('./views/list_all_my_shares_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('Javascript loaded');

  const list_all_shares = document.querySelector('div#list_all_shares');
  const listAllMySharesView = new ListAllMySharesView(list_all_shares);
  listAllMySharesView.bindEvents();


  const shares = new Shares();
  shares.getQuoteData();
  shares.getCompanyData();
  shares.getSymbolData();
  shares.getChartData();
  shares.getInternalSharesData();
});
