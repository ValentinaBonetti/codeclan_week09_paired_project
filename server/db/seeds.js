use portfolioApplicationDB;
db.dropDatabase();

db.shares.insertMany([
  {
    symbol: 'A',
    name: 'Agilent Technologies Inc.',
    n_of_shares: 10,
    cost_per_share: 100,
    date_of_purchase: '2018-10-09',
    currency: 'USD'
  },
  {
    symbol: 'AAL',
    name: 'American Airlines Group Inc.',
    n_of_shares: 1,
    cost_per_share: 120,
    date_of_purchase: '2018-05-08',
    currency: 'USD'
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    n_of_shares: 20,
    cost_per_share: 240,
    date_of_purchase: '2018-08-13',
    currency: 'USD'
  },
  {
    symbol: 'GHL',
    name: 'Greenhill & Co. Inc.',
    n_of_shares: 200,
    cost_per_share: 21.345,
    date_of_purchase: '2018-01-02',
    currency: 'USD'
  },
  {
    symbol: 'TLF',
    name: 'Tandy Leather Factory Inc.',
    n_of_shares: 1,
    cost_per_share: 10.6,
    date_of_purchase: '2018-01-19',
    currency: 'USD'
  }
  // {
  //   name: 'Cash',
  //   n_of_shares: 1,
  //   cost_per_share: 89800.40
  // }
]);
