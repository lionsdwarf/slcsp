const jsonifyCSV = require(`csvtojson`);

const PLANS_FILEPATH = `./plans.csv`;
const ZIPS_FILEPATH = `./zips.csv`;
const SLCSP_FILEPATH = `./slcsp.csv`;

const parseCSVs = async function() {
  return {
    plans: await jsonifyCSV().fromFile(PLANS_FILEPATH),
    zips: await jsonifyCSV().fromFile(ZIPS_FILEPATH),
    slcsp: await jsonifyCSV().fromFile(SLCSP_FILEPATH),
  }
}

const calcSilverRatesByArea = function(plans) {
  const silverRatesByArea = {};
  plans.forEach(plan => {
    if (plan.metal_level.toLowerCase() === `silver`) {
      const stateExists = silverRatesByArea[plan.state];
      const ratesListExists = stateExists && silverRatesByArea[plan.state][plan.rate_area];
      if (!ratesListExists) {
        if (!stateExists) {
          silverRatesByArea[plan.state] = {};
        }
        silverRatesByArea[plan.state][plan.rate_area] = [];
      }
      silverRatesByArea[plan.state][plan.rate_area].push(plan.rate);
    }
  });
  return silverRatesByArea;
}

const calcRatesByZip = function(silverRatesByArea, zips) {
  const ratesByZip = {};
  zips.forEach(zip => {
    const stateExists = silverRatesByArea[zip.state];
    const ratesListExists = stateExists && silverRatesByArea[zip.state][zip.rate_area];
    if (ratesListExists) {
      ratesByZip[zip.zipcode] = silverRatesByArea[zip.state][zip.rate_area];
    }
  });
  return ratesByZip;
}

const calcSLCSPFromRates = function(rates) {
  let lowest, secondLowest;
  rates.forEach(rate => {
    if (lowest === undefined) {
      lowest = rate;
    } else if (rate < lowest) {
      secondLowest = lowest;      
      lowest = rate;
    } else if (secondLowest === undefined || (rate < secondLowest && rate !== lowest)) {
      secondLowest = rate;
    }
  });
  return secondLowest;
}

const calcSLCSPByZip = function(ratesByZip, zips) {
  zips.forEach(zip => {
    const slcsp = ratesByZip[zip.zipcode] && calcSLCSPFromRates(ratesByZip[zip.zipcode]);
    if (ratesByZip[zip.zipcode] && slcsp) {
      zip.rate = slcsp;
    }
  });
  return zips;
}

const calcSLCSP = async function() {
  const csvData = await parseCSVs();
  const silverRatesByArea = calcSilverRatesByArea(csvData.plans);
  const ratesByZip = calcRatesByZip(silverRatesByArea, csvData.zips);
  const slcspByZip = calcSLCSPByZip(ratesByZip, csvData.slcsp);
  return slcspByZip;
}

const generateCSVSLCSP = async function() {
  const slcspByZip = await calcSLCSP();
  console.log(slcspByZip)
  //write file
}

generateCSVSLCSP();

