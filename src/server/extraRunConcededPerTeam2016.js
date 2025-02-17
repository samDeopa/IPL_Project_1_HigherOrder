const { CsvToJson } = require("./csvToJson");

const extraRunConcededPerTeam = (matches, deliveries, year) => {
  matchIdSeasonMap = {};
  for (match of matches) {
    matchIdSeasonMap[match.id] = match.season;
  }
  const extraRunsPerYear = {};
  for (bowl of deliveries) {
    const season = matchIdSeasonMap[bowl.match_id];
    if (season == year)
      extraRunsPerYear[bowl.bowling_team] =
        (extraRunsPerYear[bowl.bowling_team] || 0) + parseInt(bowl.extra_runs);
  }
  return extraRunsPerYear;
};
console.log(
  extraRunConcededPerTeam(
    CsvToJson("../data/matches.csv"),
    CsvToJson("../data/deliveries.csv"),
    2016
  )
);
module.exports = { extraRunConcededPerTeam };
