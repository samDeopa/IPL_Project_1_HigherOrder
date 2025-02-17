const { CsvToJson } = require("./csvToJson");

const matchesPerYear = (matches) => {
  const matchesPerYear = {};
  for (match of matches) {
    if (matchesPerYear[match.season] === undefined) {
      matchesPerYear[match.season] = 0;
    }
    matchesPerYear[match.season]++;
  }
  return matchesPerYear;
};
module.exports = { matchesPerYear };
