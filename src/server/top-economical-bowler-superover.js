const { CsvToJson } = require("./csvToJson");
// get the top n economical bowlers
const topEconomicalBowler = () => {
  const deliveriesData = CsvToJson("../data/deliveries.csv");
  const matchData = CsvToJson("../data/matches.csv");
  let matchIdSeasonMap = {};
  for (match of matchData) {
    matchIdSeasonMap[match.id] = match.season;
  }
  const bowlerEconomy = {};
  for (bowl of deliveriesData) {
    if (bowl.is_super_over != "0") {
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
      bowlerEconomy[bowlerName][0] / bowlerEconomy[bowlerName][1],
    ]);
  }
  EconomyArray.sort((a, b) => a[1] - b[1]);
  return EconomyArray[0];
};
console.log(topEconomicalBowler());
module.exports = { topEconomicalBowler };
