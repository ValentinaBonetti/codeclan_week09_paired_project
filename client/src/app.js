const Shares = require ('./models/shares_portfolio.js');


document.addEventListener('DOMContentLoaded', () => {
  console.log('Javascript loaded');



  const shares = new Shares();
  shares.getQuoteData();
  shares.getCompanyData();
  shares.getSymbolData();
  shares.getChartData();
});
