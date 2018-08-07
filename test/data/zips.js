const input = [
  {
    zipcode: 1,
    state: 'CO',
    rate_area: 11,
  },
  {
    zipcode: 2,
    state: 'CO',
    rate_area: 12,
  },
  {
    zipcode: 3,
    state: 'CO',
    rate_area: 13,
  },
  {
    zipcode: 3,
    state: 'CO',
    rate_area: 13,
  },
  {
    zipcode: 4,
    state: 'NY',
    rate_area: 14,
  },
  {
    zipcode: 4,
    state: 'NY',
    rate_area: 15,
  },
  {
    zipcode: 4,
    state: 'NY',
    rate_area: 14,
  },
  {
    zipcode: 4,
    state: 'NY',
    rate_area: 15,
  },
  {
    zipcode: 5,
    state: 'NY',
    rate_area: 15,
  },
  {
    zipcode: 6,
    state: 'NY',
    rate_area: 16,
  },
  {
    zipcode: 6,
    state: 'NY',
    rate_area: 17,
  },
];

const output = {
  1: ['CO 11'],
  2: ['CO 12'],
  3: ['CO 13'],
  4: ['NY 14', 'NY 15'],
  5: ['NY 15'],
  6: ['NY 16', 'NY 17'],
};

module.exports = {
  input,
  output,
}

