const { CsvToJson } = require("./csvToJson");
const { writeToFile } = require("./writeToFile");

const matchesPerYear = () => {
  const matches = CsvToJson("../data/matches.csv");
  const matchesPerYear = matches.reduce((accumulator, match) => {
    accumulator[match.season] = (accumulator[match.season] || 0) + 1;
    return accumulator;
  }, {});

  writeToFile("matches_per_year", JSON.stringify(matchesPerYear));
  return matchesPerYear;
};
console.log(matchesPerYear());
module.exports = { matchesPerYear };
