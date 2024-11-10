const {
    getTotalPopulationByCountryAndYear,
    getPopulationByContinentYearAndAge,
} = require("./aggregation.js");
    
async function displayPopulationByCountryAndYear(country) {
    const result = await getTotalPopulationByCountryAndYear(country);
    console.log(`Total population for ${country} by year:`);
    console.log(result);
}
    
async function displayPopulationByContinentYearAndAge(year, ageGroup) {
    const result = await getPopulationByContinentYearAndAge(year, ageGroup);
    console.log(
    `Population by continent for year ${year} and age group ${ageGroup}:`
    );
    console.log(result);
}
    
displayPopulationByCountryAndYear("Netherlands");
displayPopulationByContinentYearAndAge(2020, "100+");