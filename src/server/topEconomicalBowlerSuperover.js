const { csvToJson } = require("./csvToJson");

// get the top n economical bowlers
const topEconomicalBowler = (deliveries) => {
  const bowlerEconomy = deliveries.reduce((accumulator, delivery) => {
    const bowler = delivery.bowler;
    if (delivery.is_super_over != "0") {
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

  return EconomyArray[0];
};
console.log(topEconomicalBowler(csvToJson("../data/deliveries.csv")));
module.exports = { topEconomicalBowler };
