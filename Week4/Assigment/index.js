const importData = require("./importData");
const getTotalPopulation = require("./getTotalPopulation");
const getContinentData = require("./getContinentData");
const setupAccounts = require("./setup");
const transfer = require("./transfer");

(async () => {
  await importData();

  console.log(await getTotalPopulation("Netherlands"));
  console.log(await getContinentData(2020, "100+"));

  await setupAccounts();
  await transfer(101, 102, 1000, "Test transfer");
})();
