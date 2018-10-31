use portfolioApplicationDB;
db.dropDatabase();

db.shares.insertMany([
  {
    symbol: 'A',
    name: 'Agilent Technologies Inc.',
    n_of_shares: 10,
    cost_per_share: 60,
    date_of_purchase: '2018-10-09',
    currency: 'USD',
    sector: 'Healthcare'
  },
  {
    symbol: 'AAL',
    name: 'American Airlines Group Inc.',
    n_of_shares: 1,
    cost_per_share: 30,
    date_of_purchase: '2018-05-08',
    currency: 'USD',
    sector: 'Industrials'
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    n_of_shares: 20,
    cost_per_share: 200,
    date_of_purchase: '2018-08-13',
    currency: 'USD',
    sector: 'Technology'
  },
  {
    symbol: 'GHL',
    name: 'Greenhill & Co. Inc.',
    n_of_shares: 200,
    cost_per_share: 21,
    date_of_purchase: '2018-01-02',
    currency: 'USD',
    sector: 'Financial Services'
  },
  {
    symbol: 'TLF',
    name: 'Tandy Leather Factory Inc.',
    n_of_shares: 1,
    cost_per_share: 5,
    date_of_purchase: '2018-01-19',
    currency: 'USD',
    sector: 'Consumer Cyclical'
  }
  // {
  //   name: 'Cash',
  //   n_of_shares: 1,
  //   cost_per_share: 89800.40
  // }
]);
