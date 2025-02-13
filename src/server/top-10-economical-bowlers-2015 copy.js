const { CsvToJson } = require("./csvToJson");
// get the top n economical bowlers
const topEconomicalBowler = (n) => {
  const deliveriesData = CsvToJson("../data/deliveries.csv");
  const matchData = CsvToJson("../data/matches.csv");
  let matchIdSeasonMap = {};
  for (match of matchData) {
    matchIdSeasonMap[match.id] = match.season;
  }
  const bowlerEconomy = {};
  for (bowl of deliveriesData) {
    if (matchIdSeasonMap[bowl.match_id] == 2015) {
      if (bowlerEconomy[bowl.bowler] === undefined) {
        bowlerEconomy[bowl.bowler] = [0, 0];
      }
      bowlerEconomy[bowl.bowler][0] += parseInt(bowl.batsman_runs);
      bowlerEconomy[bowl.bowler][1]++;
    }
  }
  const EconomyArray = [];
  for (bowlerName in bowlerEconomy) {
    EconomyArray.push([
      bowlerName,
      (bowlerEconomy[bowlerName][0] / bowlerEconomy[bowlerName][1]).toFixed(2),
    ]);
  }
  EconomyArray.sort((a, b) => a[1] - b[1]);
  return EconomyArray.slice(0, n);
};
console.log(topEconomicalBowler(10));
module.exports = { topEconomicalBowler };
