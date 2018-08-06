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

let calcSilverRatesByArea = function(plans) {
  const silverRatesByArea = {};
  plans.forEach(plan => {
    if (plan.metal_level.toLowerCase() === `silver`) {
      const stateExists = silverRatesByArea[plan.state];
      const ratesListExists = stateExists && silverRatesByArea[plan.state][plan.rate_area];
      if (!ratesListExists){
        if (!stateExists) {
          silverRatesByArea[plan.state] = {};
        }
        silverRatesByArea[plan.state][plan.rate_area] = [];
      }
      silverRatesByArea[plan.state][plan.rate_area].push(plan.rate);
    }
  })
  return silverRatesByArea;
}

let slcspCalc = async function() {
  const csvData = await parseCSVs();
  const silverRatesByArea = calcSilverRatesByArea(csvData.plans);
  console.log(silverRatesByArea)
}

slcspCalc();

