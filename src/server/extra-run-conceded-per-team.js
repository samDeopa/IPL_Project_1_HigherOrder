const { CsvToJson } = require("./csvToJson");

const extraRunConcededPerTeam = () => {
  const deliveriesData = CsvToJson("../data/deliveries.csv");
  const matchData = CsvToJson("../data/matches.csv");
  matchIdSeasonMap = {};
  for (match of matchData) {
    matchIdSeasonMap[match.id] = match.season;
  }
  const extraRunsPerYear = {};
  for (bowl of deliveriesData) {
    const season = matchIdSeasonMap[bowl.match_id];
    if (extraRunsPerYear[bowl.bowling_team] === undefined) {
      extraRunsPerYear[bowl.bowling_team] = {};
    }
    if (extraRunsPerYear[bowl.bowling_team][season] === undefined) {
      extraRunsPerYear[bowl.bowling_team][season] = 0;
    }
    extraRunsPerYear[bowl.bowling_team][season] += parseInt(bowl.extra_runs);
  }
  return extraRunsPerYear;
};
console.log(extraRunConcededPerTeam());
module.exports = { extraRunConcededPerTeam };
