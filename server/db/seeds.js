use portfolioApplicationDB;
db.dropDatabase();

db.shares.insertMany([
  {
    symbol: 'aab',
    name: 'American Adventures',
    n_of_shares: 10,
    cost: 1000,
    date_of_purchase: '2018-10-09',
    currency: 'USD'
  },
  {
    symbol: 'acb',
    name: 'Abracadabra',
    n_of_shares: 1,
    cost: 120,
    date_of_purchase: '2016-05-08',
    currency: 'USD'
  },
  {
    symbol: 'apple',
    name: 'Apple',
    n_of_shares: 20,
    cost: 2400,
    date_of_purchase: '2017-08-13',
    currency: 'USD'
  },
  {
    symbol: 'linuxf',
    name: 'The Linux Foundation',
    n_of_shares: 200,
    cost: 21345,
    date_of_purchase: '2015-01-02',
    currency: 'USD'
  },
  {
    symbol: 'mics',
    name: 'Microsoft',
    n_of_shares: 1,
    cost: 10.6,
    date_of_purchase: '1999-01-19',
    currency: 'USD'
  }
]);
