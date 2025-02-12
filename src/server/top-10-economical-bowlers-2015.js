const { CsvToJson } = require("./csvToJson");
// get the top n economical bowlers
const topEconomicalBowler = (n) => {
  const deliveries = CsvToJson("../data/deliveries.csv");
  const matches = CsvToJson("../data/matches.csv");
  let matchIdSeasonMap = {};
  matches.map((match) => {
    matchIdSeasonMap[match.id] = match.season;
  });
  const bowlerEconomy = deliveries.reduce((accumulator, delivery) => {
    const bowler = delivery.bowler;
    if (matchIdSeasonMap[delivery.match_id] == 2015) {
      if (accumulator[bowler] == undefined) {
        accumulator[bowler] = [0, 0];
      }
      accumulator[bowler][0] += parseInt(delivery.batsman_runs);
      accumulator[bowler][1]++;
    }
    return accumulator;
  }, {});

  const bowlers = Object.keys(bowlerEconomy);
  const EconomyArray = bowlers.reduce((accumulator, bowlerName) => {
    accumulator.push([
      bowlerName,
      (bowlerEconomy[bowlerName][0] / bowlerEconomy[bowlerName][1]).toFixed(2),
    ]);
    return accumulator;
  }, []);

  EconomyArray.sort((a, b) => a[1] - b[1]);
  return EconomyArray.slice(0, n);
};
console.log(topEconomicalBowler(10));
module.exports = { topEconomicalBowler };
