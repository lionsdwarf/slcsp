const jsonifyCSV = require(`csvtojson`);
const fs = require(`fs`);

const PLANS_FILEPATH = `./plans.csv`;
const ZIPS_FILEPATH = `./zips.csv`;
const SLCSP_FILEPATH = `./slcsp.csv`;
//load csv data as json
const parseCSVs = async function() {
  return {
    plans: await jsonifyCSV().fromFile(PLANS_FILEPATH),
    zips: await jsonifyCSV().fromFile(ZIPS_FILEPATH),
    slcsp: await jsonifyCSV().fromFile(SLCSP_FILEPATH),
  }
}
// structure data as: {
//   <zipcode>: [<silver rates arr>]
// }
const mapSilverRatesToArea = function(plans) {
  const silverRatesByArea = {};
  plans.forEach(row => {
    if (row.metal_level.toLowerCase() === `silver`) {
      const stateExists = silverRatesByArea[row.state];
      const ratesListExists = stateExists && silverRatesByArea[row.state][row.rate_area];
      if (!ratesListExists) {
        if (!stateExists) {
          silverRatesByArea[row.state] = {};
        }
        silverRatesByArea[row.state][row.rate_area] = [];
      }
      silverRatesByArea[row.state][row.rate_area].push(row.rate);
    }
  });
  return silverRatesByArea;
}

const getRateArea = (zip) => `${zip.state} ${zip.rate_area}`;

//we are concerned with zipcodes with multiple rate areas
const mapZipsToAreas = function(zips) {
  const zipsToAreas = {};
  zips.forEach((zip) => {
    if (!zipsToAreas[zip.zipcode]) {
      zipsToAreas[zip.zipcode] = [getRateArea(zip)];
    } else {
      if (zipsToAreas[zip.zipcode].indexOf(getRateArea(zip)) === -1) {
        zipsToAreas[zip.zipcode].push(getRateArea(zip));
      }
    }
  });
  return zipsToAreas;
}
//structure data as: {
//   <zipcode>: [silver rates arr]
// }
const mapRatesToZip = function(silverRatesByArea, zips) {
  const ratesByZip = {};
  //get zips in multiple rate areas
  const zipsToAreas = mapZipsToAreas(zips);
  zips.forEach(row => {
    const stateExists = silverRatesByArea[row.state];
    const ratesListExists = stateExists && silverRatesByArea[row.state][row.rate_area];
    //ignore zips in multiple rate areas
    if (ratesListExists && zipsToAreas[row.zipcode].length === 1) {
      ratesByZip[row.zipcode] = silverRatesByArea[row.state][row.rate_area];
    }
  });
  return ratesByZip;
}

const calcSLCSPFromRates = function(rates) {
  rates.length < 2 && console.log(rates)
  let lowest, secondLowest;
  rates.forEach(rate => {
    rate = parseFloat(rate);
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

const mapSLCSPToZip = function(ratesByZip, zips) {
  zips.forEach(row => {
    const slcsp = ratesByZip[row.zipcode] && calcSLCSPFromRates(ratesByZip[row.zipcode]);
    if (ratesByZip[row.zipcode] && slcsp) {
      row.rate = slcsp;
    }
  });
  return zips;
}

const calcSLCSP = async function() {
  const csvData = await parseCSVs();
  const silverRatesByArea = mapSilverRatesToArea(csvData.plans);
  const ratesByZip = mapRatesToZip(silverRatesByArea, csvData.zips);
  const slcspByZip = mapSLCSPToZip(ratesByZip, csvData.slcsp);
  return slcspByZip;
}

const generateCSVString = function(slcspByZip) {
  let csvString = ``;
  slcspByZip.forEach(row => {
    if (csvString === ``) {
      csvString += `zipcode,rate\n`;
    }
    csvString += `${row.zipcode},${row.rate}\n`;
  });
  return csvString;
}

const generateSLCSP = async function() {
  const slcspByZip = await calcSLCSP();
  const csvString = generateCSVString(slcspByZip);
  fs.writeFileSync(SLCSP_FILEPATH, csvString);
}

generateSLCSP();

//exports for tests
exports.mapSilverRatesToArea = mapSilverRatesToArea;
exports.mapZipsToAreas = mapZipsToAreas;
exports.mapRatesToZip = mapRatesToZip;
exports.calcSLCSPFromRates = calcSLCSPFromRates;
exports.mapSLCSPToZip = mapSLCSPToZip;