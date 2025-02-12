const { CsvToJson } = require("./csvToJson");
const { writeToFile } = require("./writeToFile");

const matchesWonPerYearPerTeam = () => {
  const matches = CsvToJson("../data/matches.csv");

  const matchesWonPerYear = matches.reduce((accumulator, match) => {
    if (match.result == "no result") {
      return accumulator;
    }
    if (accumulator[match.winner] === undefined) {
      accumulator[match.winner] = {};
    }
    accumulator[match.winner][match.season] =
      (accumulator[match.winner][match.season] || 0) + 1;
    return accumulator;
  }, {});
  writeToFile(
    "matches_won_per_team_per_year",
    JSON.stringify(matchesWonPerYear)
  );
  return matchesWonPerYear;
};
console.log(matchesWonPerYearPerTeam());
module.exports = { matchesWonPerYearPerTeam };
