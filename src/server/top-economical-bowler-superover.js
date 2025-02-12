const { CsvToJson } = require("./csvToJson");
const { writeToFile } = require("./writeToFile");
// get the top n economical bowlers
const topEconomicalBowler = () => {
  const deliveries = CsvToJson("../data/deliveries.csv");

  const bowlerEconomy = deliveries.reduce((accumulator, delivery) => {
    const bowler = delivery.bowler;
    if (delivery.is_super_over != "0") {
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
  writeToFile(
    "top_ecomical_bowler_super_over",
    JSON.stringify(EconomyArray[0])
  );
  return EconomyArray[0];
};
console.log(topEconomicalBowler());
module.exports = { topEconomicalBowler };
