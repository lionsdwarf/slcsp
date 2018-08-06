const jsonifyCSV = require(`csvtojson`);

const PLANS_FILEPATH = `./plans.csv`;
const ZIPS_FILEPATH = `./zips.csv`;
const SLCSP_FILEPATH = `./slcsp.csv`;

let parseCSVs = async function() {
  return {
    plans: await jsonifyCSV().fromFile(PLANS_FILEPATH),
    zips: await jsonifyCSV().fromFile(ZIPS_FILEPATH),
    slcsp: await jsonifyCSV().fromFile(SLCSP_FILEPATH),
  }
}

// let calcSilverRatesByRateArea = function() {

// }

let slcspCalc = async function() {
  let csvData = await parseCSVs();
}

slcspCalc();

