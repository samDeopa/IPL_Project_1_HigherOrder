const { CsvToJson } = require("./csvToJson");
const { writeToFile } = require("./writeToFile");

const tossAndMatchWon = () => {
  const matches = CsvToJson("../data/matches.csv");
  const matchesAndTossWon = matches.reduce((accumulator, match) => {
    if (match.toss_winner == match.winner) {
      accumulator[match.winner] = (accumulator[match.winner] || 0) + 1;
    }
    return accumulator;
  }, {});
  writeToFile("toss_and_match_won", JSON.stringify(matchesAndTossWon));
  return matchesAndTossWon;
};
console.log(tossAndMatchWon());
module.exports = { tossAndMatchWon };
