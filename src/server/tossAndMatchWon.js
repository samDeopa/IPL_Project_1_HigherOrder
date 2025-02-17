const { CsvToJson } = require("./csvToJson");

const tossAndMatchWon = (matches) => {
  const matchesAndTossWon = {};
  for (match of matches) {
    if (match.toss_winner == match.winner) {
      if (matchesAndTossWon[match.winner] === undefined) {
        matchesAndTossWon[match.winner] = 0;
      }
      matchesAndTossWon[match.winner]++;
    }
  }
  return matchesAndTossWon;
};
console.log(tossAndMatchWon());
module.exports = { tossAndMatchWon };
