const jsonifyCSV = require(`csvtojson`);
const fs = require(`fs`);

const {
  mapAreasToSilverRates,
  mapZipsToRates,
  calcSLCSPFromRates,
  generateCSVString,
  mapZipsToSLCSPs,
} = require(`./util`);

const PLANS_FILEPATH = `./plans.csv`;
const ZIPS_FILEPATH = `./zips.csv`;
const SLCSP_FILEPATH = `./slcsp.csv`;

// load csv data as json
const parseCSVs = async function() {
  return {
    plans: await jsonifyCSV().fromFile(PLANS_FILEPATH),
    zips: await jsonifyCSV().fromFile(ZIPS_FILEPATH),
    slcsp: await jsonifyCSV().fromFile(SLCSP_FILEPATH),
  }
}

const calcSLCSP = function(csvData) {
  const areasToSilverRates = mapAreasToSilverRates(csvData.plans);
  const zipsToRates = mapZipsToRates(areasToSilverRates, csvData.zips);
  const zipsToSLCSPs = mapZipsToSLCSPs(zipsToRates, csvData.slcsp);
  return zipsToSLCSPs;
}

const generateSLCSP = async function() {
  const csvData = await parseCSVs();
  const zipsToSLCSPs = await calcSLCSP(csvData);
  fs.writeFileSync(SLCSP_FILEPATH, generateCSVString(zipsToSLCSPs));
}

generateSLCSP();
