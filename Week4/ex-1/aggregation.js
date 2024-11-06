const connectToDatabase = require("../homework/connection-db");

async function getTotalPopulationByCountryAndYear(country) {
    const db = await connectToDatabase();
    return await db
        .collection("populationData")
        .aggregate([
            { $match: { Country: country } },
            {
                $group: {
                    _id: "$Year",
                    countPopulation: { $sum: { $add: ["$M", "$F"] } },
                },
            },
            { $sort: { _id: 1 } },
        ])
        .toArray();
}

async function getPopulationByContinentYearAndAge(year, ageGroup) {
    const db = await connectToDatabase();
    return await db
        .collection("populationData")
        .aggregate([
            { $match: { Year: year, Age: ageGroup } },
            {
                $project: {
                    Country: 1,
                    Year: 1,
                    Age: 1,
                    M: 1,
                    F: 1,
                    TotalPopulation: { $add: ["$M", "$F"] },
                },
            },
        ])
        .toArray();
}

module.exports = {
    getTotalPopulationByCountryAndYear,
    getPopulationByContinentYearAndAge,
};