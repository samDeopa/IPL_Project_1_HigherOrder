const { CsvToJson } = require("./csvToJson");
const { writeToFile } = require("./writeToFile");

const extraRunConcededPerTeam = () => {
  const deliveries = CsvToJson("../data/deliveries.csv");
  const matchs = CsvToJson("../data/matches.csv");
  matchIdSeasonMap = {};
  matchs.map((match) => {
    matchIdSeasonMap[match.id] = match.season;
  });
  const extraRunsPerYear = deliveries.reduce((accumulator, delivery) => {
    const season = matchIdSeasonMap[delivery.match_id];
    if (season === "2016") {
      accumulator[delivery.bowling_team] =
        (accumulator[delivery.bowling_team] || 0) +
        parseInt(delivery.extra_runs);
    }
    return accumulator;
  }, {});

  writeToFile("extra_runs_per_year", JSON.stringify(extraRunsPerYear));
  return extraRunsPerYear;
};
console.log(extraRunConcededPerTeam());
module.exports = { extraRunConcededPerTeam };
