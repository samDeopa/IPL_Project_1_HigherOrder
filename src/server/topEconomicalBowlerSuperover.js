const { CsvToJson } = require("./csvToJson");
// get the top n economical bowlers
const topEconomicalBowler = (deliveries, matches) => {
  let matchIdSeasonMap = {};
  for (match of matches) {
    matchIdSeasonMap[match.id] = match.season;
  }
  const bowlerEconomy = {};
  for (bowl of deliveries) {
    if (bowl.is_super_over != "0") {
      if (bowlerEconomy[bowl.bowler] === undefined) {
        bowlerEconomy[bowl.bowler] = [0, 0];
      }
      bowlerEconomy[bowl.bowler][0] += parseInt(bowl.batsman_runs);
      bowlerEconomy[bowl.bowler][1]++;
    }
  }
  const economy = [];
  for (bowler in bowlerEconomy) {
    economy.push([bowler, bowlerEconomy[bowler][0] / bowlerEconomy[bowler][1]]);
  }
  economy.sort((a, b) => a[1] - b[1]);
  return economy[0];
};
console.log(topEconomicalBowler());
module.exports = { topEconomicalBowler };
