let assert = require(`assert`);

let data = require(`./data`);
let funcs = require(`../main`);

describe(`functions: `, () => {

  describe(`mapAreasToSilverRates`, () => {
    const srba = funcs.mapAreasToSilverRates(data.plans.input);
    it(`should map a list of silver plan rates to a rate area`, () => {
      assert.equal(srba.ME[1].length, 4);
      assert.equal(srba.ME[2].length, 1);
      assert.equal(srba.CO[1].length, 1);
      assert.equal(srba.CO[4].length, 1);
    });    
    it(`should not map rates for non-silver rate areas`, () => {
      assert.equal(srba.NJ, undefined);
      assert.equal(srba.ME[1].indexOf('400'), -1);
    })
  });

  describe(`calcSLCSPFromRates`, () => {
    it(`should return the second lowest value in the list`, () => {
      for (let i in data.rates.inputs) {
        const slcsp = funcs.calcSLCSPFromRates(data.rates.inputs[i]);
        assert.equal(slcsp, data.rates.outputs[i]);
      }
    })
  });

  describe(`mapZipsToAreas`, () => {
    it(`should map a zip code to a list of all of it's rate areas`, () => {
      assert.deepEqual(funcs.mapZipsToAreas(data.zips.input), data.zips.output);
    });
  });

  //additional function tests here:

});