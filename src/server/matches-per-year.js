const { CsvToJson } = require("./csvToJson");

const matchesPerYear = () => {
  const data = CsvToJson("../data/matches.csv");
  const matchesPerYear = {};
  for (match of data) {
    if (matchesPerYear[match.season] === undefined) {
      matchesPerYear[match.season] = 0;
    }
    if (matchesPerYear[match.season] === undefined) {
      matchesPerYear[match.season] = 0;
    }
    matchesPerYear[match.season]++;
  }
  return matchesPerYear;
};
module.exports = { matchesPerYear };
