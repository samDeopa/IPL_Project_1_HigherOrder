const { csvToJson } = require("./csvToJson");

// get the top n economical bowlers
const topEconomicalBowler = (matches, deliveries, n) => {
  let matchIdSeasonMap = {};
  matches.map((match) => {
    matchIdSeasonMap[match.id] = match.season;
  });
  const bowlerEconomy = deliveries.reduce((accumulator, delivery) => {
    const bowler = delivery.bowler;
    if (matchIdSeasonMap[delivery.match_id] == 2015) {
      if (accumulator[bowler] == undefined) {
        accumulator[bowler] = { runs: 0, deliveries: 0 };
      }
      accumulator[bowler].runs += parseInt(delivery.batsman_runs);
      accumulator[bowler].deliveries += 1;
    }
    return accumulator;
  }, {});

  const bowlers = Object.keys(bowlerEconomy);
  const EconomyArray = bowlers.reduce((accumulator, bowlerName) => {
    accumulator.push([
      bowlerName,
      (
        bowlerEconomy[bowlerName].runs / bowlerEconomy[bowlerName].deliveries
      ).toFixed(2),
    ]);
    return accumulator;
  }, []);

  EconomyArray.sort((a, b) => a[1] - b[1]);
  return EconomyArray.slice(0, n);
};
console.log(
  topEconomicalBowler(
    csvToJson("../data/matches.csv"),
    csvToJson("../data/deliveries.csv"),
    10
  )
);
module.exports = { topEconomicalBowler };
