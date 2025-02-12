const { CsvToJson } = require("./csvToJson");
const { writeToFile } = require("./writeToFile");
// get the top n economical bowlers
const highestNumberOfDissmissal = () => {
  const deliveries = CsvToJson("../data/deliveries.csv");
  const dissmissals = deliveries.reduce((accumulator, delivery) => {
    if (delivery.player_dismissed) {
      if (accumulator[delivery.bowler] === undefined) {
        accumulator[delivery.bowler] = {};
      }
      if (accumulator[delivery.bowler][delivery.batsman] === undefined) {
        accumulator[delivery.bowler][delivery.batsman] = 0;
      }
      accumulator[delivery.bowler][delivery.batsman]++;
    }
    return accumulator;
  }, {});

  const bowlers = Object.keys(dissmissals);
  let highestDissmissal = bowlers.reduce(
    (accumulator, bowler) => {
      const battters = Object.keys(dissmissals[bowler]);
      const currentHighest = battters.reduce(
        (accumulator, batsman) => {
          accumulator =
            accumulator.dissmissals > dissmissals[bowler][batsman]
              ? accumulator
              : {
                  bowler: bowler,
                  batsman: batsman,
                  dissmissals: dissmissals[bowler][batsman],
                };
          return accumulator;
        },
        {
          bowler: "",
          batsman: "",
          dissmissals: 0,
        }
      );

      return accumulator.dissmissals > currentHighest.dissmissals
        ? accumulator
        : currentHighest;
    },
    {
      bowler: "",
      batsman: "",
      dissmissals: 0,
    }
  );
  writeToFile(
    "hightest_number_of_dissmissals",
    JSON.stringify(highestDissmissal)
  );
  return highestDissmissal;
};
console.log(highestNumberOfDissmissal());
module.exports = { highestNumberOfDissmissal };
