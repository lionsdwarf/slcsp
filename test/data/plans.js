const input = [
  { 
    state: 'ME',
    metal_level: 'Silver',
    rate: '100',
    rate_area: '1' 
  },
  { 
    state: 'ME',
    metal_level: 'Silver',
    rate: '100',
    rate_area: '1' 
  },
  { 
    state: 'ME',
    metal_level: 'Silver',
    rate: '200',
    rate_area: '1' 
  },
  { 
    state: 'ME',
    metal_level: 'Silver',
    rate: '300',
    rate_area: '1' 
  },
  { 
    state: 'ME',
    metal_level: 'Silver',
    rate: '300',
    rate_area: '2' 
  },
  { 
    state: 'ME',
    metal_level: 'Bronze',
    rate: '400',
    rate_area: '1' 
  },
  { 
    state: 'NJ',
    metal_level: 'Bronze',
    rate: '400',
    rate_area: '1' 
  },
  { 
    state: 'CO',
    metal_level: 'Silver',
    rate: '300',
    rate_area: '1' 
  },
  { 
    state: 'CO',
    metal_level: 'Silver',
    rate: '100',
    rate_area: '4' 
  },
];

const output = {
  ME: {
    1: ['100', '100', '200', '300'],
    2: ['300'],
  },
  CO: {
    1: ['300'],
    4: ['100'],
  },
}


module.exports = {
  input,
  output,
};