const PubSub = require('../helpers/pub_sub.js');
const dateFormat = require('dateformat');

const BuyAndSellView = function (container) {
  this.container = container;
  this.myPortfolioItems = [];
}

BuyAndSellView.prototype.bindEvents = function () {
  // get internal db with ids
  PubSub.subscribe('SharesPortfolio:internal-api-list-ready', (event) => {
    this.myPortfolioItems = event.detail;
    console.log('HEREEEEE',this.myPortfolioItems);
  })

  PubSub.subscribe('NavView:market-button-clicked', () => {
    this.renderSellAShareFromPortfolio();
  })
  PubSub.subscribe('ShareItemView:buy-button-clicked', (event) => {
    const shareObject = event.detail;
    this.renderBuyAShare(shareObject);
  })
};

BuyAndSellView.prototype.clearView = function () {
  this.container.innerHTML = '';
};

BuyAndSellView.prototype.renderSellAShareFromPortfolio = function () {
  this.container.innerHTML='';
  const temporary = document.createElement('h1');
  temporary.textContent = 'market view - sell a share from your portfolio';
  this.container.appendChild(temporary);
};

BuyAndSellView.prototype.renderBuyAShare = function (share) {
  this.clearView();

  const shareItem = document.createElement('div');
  shareItem.classList.add('buyShare-item');
  this.container.appendChild(shareItem)

  const divName = document.createElement('div');
  divName.classList.add('divName');
  shareItem.appendChild(divName)

  const shareName = document.createElement('h2');
  shareName.textContent = `${share.companyName}`;
  divName.appendChild(shareName);

  const shareLogo = document.createElement('img')
  shareLogo.src = share.logo;
  shareLogo.alt = share.companyName;
  shareLogo.classList.add("logo");
  divName.appendChild(shareLogo)

  const divExchSymb = document.createElement('div');
  divExchSymb.classList.add('divExchSymb');
  shareItem.appendChild(divExchSymb);

  const shareExchangeSymbol = document.createElement('h6');
  shareExchangeSymbol.textContent = `${share.primaryExchange} :    ${share.symbol}`;
  divExchSymb.appendChild(shareExchangeSymbol);

  const divPriceBlock = document.createElement('div');
  divPriceBlock.classList.add('divPriceBlock');
  shareItem.appendChild(divPriceBlock);

  const divPrice = document.createElement('div');
  divPrice.classList.add('divPrice');
  divPriceBlock.appendChild(divPrice);

  const sharePrice = document.createElement('h1');
  sharePrice.textContent = `${share.price}`;
  divPrice.appendChild(sharePrice);

  const divPriceMov = document.createElement('div');
  divPriceMov.classList.add('divPriceMov');
  divPriceBlock.appendChild(divPriceMov);

  const sharePriceMov = document.createElement('h3');
  sharePriceMov.textContent = `${share.change}`;
  if (share.change<0) {
  sharePriceMov.style.color = "red"};
  divPriceMov.appendChild(sharePriceMov);

  const sharePriceMovPge = document.createElement('h3');
  sharePriceMovPge.textContent = `${Math.round(share.changePercent*10000)/100}%`;
  if (share.changePercent<0) {
  sharePriceMovPge.style.color = "red"};
  divPriceMov.appendChild(sharePriceMovPge);

  const divFundamentals = document.createElement('div');
  divFundamentals.classList.add('divFundamentals');
  shareItem.appendChild(divFundamentals);

  const divFundamentals1 = document.createElement('div');
  divFundamentals1.classList.add('divFundamentals1');
  divFundamentals.appendChild(divFundamentals1);

  const sharePreviousClose = this.createDetail('Previous Close : ',share.previousClose);
  divFundamentals1.appendChild(sharePreviousClose);

  const shareWeek52High = this.createDetail('52 Week High : ',share.week52High);
  divFundamentals1.appendChild(shareWeek52High);

  const shareWeek52Low = this.createDetail('52 Week Low : ',share.week52Low);
  divFundamentals1.appendChild(shareWeek52Low);

  const divFundamentals2 = document.createElement('div');
  divFundamentals2.classList.add('divFundamentals2');
  divFundamentals.appendChild(divFundamentals2);

  const price = this.createDetail('Price : ',share.price);
  divFundamentals2.appendChild(price);

  const priceToBook = this.createDetail('Price to book : ',share.priceToBook);
  divFundamentals2.appendChild(priceToBook);

  const priceToSales = this.createDetail('Price to sales : ',share.priceToSales);
  divFundamentals2.appendChild(priceToSales);

/////////////////// buy //////////////////////

  const buyItem = document.createElement('div');
  buyItem.classList.add('divGraph-item');
  buyItem.id = 'buy-form-container'
  this.container.appendChild(buyItem)

  const buy_form = document.createElement('form');
  buy_form.id = "put-new-share-into-portfolio";
  const quantity_label = document.createElement('label');
  quantity_label.for = "number-field";
  quantity_label.textContent = 'quantity';
  buy_form.appendChild(quantity_label);
  const quantity_input = document.createElement('input');
  quantity_input.type = "number";
  quantity_input.id = "number-field";
  buy_form.appendChild(quantity_input);
  const buy_form_button = document.createElement('button');
  buy_form_button.type = "submit";
  buy_form_button.textContent = "BUY";
  buy_form.appendChild(buy_form_button);
  buyItem.appendChild(buy_form);

  buy_form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Format today's date:
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();
    if(dd<10) {
        dd = '0'+dd;
    }
    if(mm<10) {
        mm = '0'+mm;
    }
    today = yyyy + '-' + mm + '-' + dd;

    const shareToInternalDB = {};
    shareToInternalDB.symbol = share.symbol;
    shareToInternalDB.name = share.companyName;
    shareToInternalDB.cost_per_share = share.price + share.priceToBook;
    shareToInternalDB.date_of_purchase = today;
    shareToInternalDB.currency = "USD"; // change to effective currency if needed
    shareToInternalDB.n_of_shares = event.target['number-field'].value;

    PubSub.publish('BuyAndSellView:put-share-in-internal-db',shareToInternalDB);
  });

////////////// end of buy //////////////////////



/////////////////// sell //////////////////////

  const sellItem = document.createElement('div');
  sellItem.classList.add('divGraph-item');
  sellItem.id = 'sell-form-container'
  this.container.appendChild(sellItem)

  const sell_form = document.createElement('form');
  sell_form.id = "delete-share-from-portfolio";
  const quantity_label_sell = document.createElement('label');
  quantity_label_sell.for = "number-field";
  quantity_label_sell.textContent = 'quantity';
  sell_form.appendChild(quantity_label_sell);
  const quantity_input_sell = document.createElement('input');
  quantity_input_sell.type = "number";
  quantity_input_sell.id = "number-field-sell";
  sell_form.appendChild(quantity_input_sell);
  const sell_form_button = document.createElement('button');
  sell_form_button.type = "submit";
  sell_form_button.textContent = "SELL";
  sell_form.appendChild(sell_form_button);
  sellItem.appendChild(sell_form);

  sell_form.addEventListener('submit', function (event) {
    event.preventDefault();

    const shareToSellFromInternalDB = {};
    console.log('FROM INSIDE:',this.myPortfolioItems);
    // const selectedeShare = this.myPortfolioItems.find(selected => selected.symbol === share.symbol);
    // shareToSellFromInternalDB._id = selectedeShare._id;
    shareToSellFromInternalDB.n_of_shares = event.target['number-field-sell'].value;

    console.log('UPDATE THIS:',shareToSellFromInternalDB);
    PubSub.publish('BuyAndSellView:sell-share-from-internal-db',shareToSellFromInternalDB);
  });

////////////// end of sell //////////////////////


};

BuyAndSellView.prototype.createDetail = function (label, property) {
const element = document.createElement('p');
element.textContent = `${label}    ${property}`;
return element;
};



module.exports = BuyAndSellView;
