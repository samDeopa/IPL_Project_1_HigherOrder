const { CsvToJson } = require("./csvToJson");

const matchesWonPerYearPerTeam = () => {
  const data = CsvToJson("../data/matches.csv");
  const matchesWonPerYear = {};
  for (match of data) {
    if (match.result == "no result") {
      continue;
    }
    if (matchesWonPerYear[match.winner] === undefined) {
      matchesWonPerYear[match.winner] = {};
    }
    if (matchesWonPerYear[match.winner][match.season] === undefined) {
      matchesWonPerYear[match.winner][match.season] = 0;
    }
    matchesWonPerYear[match.winner][match.season]++;
  }
  return matchesWonPerYear;
};
console.log(matchesWonPerYearPerTeam());
module.exports = { matchesWonPerYearPerTeam };
