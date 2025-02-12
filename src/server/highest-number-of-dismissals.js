const { CsvToJson } = require("./csvToJson");
// get the top n economical bowlers
const highestNumberOfDissmissal = () => {
  const deliveriesData = CsvToJson("../data/deliveries.csv");
  const dissmissals = {};
  for (bowl of deliveriesData) {
    if (bowl.player_dismissed) {
      if (dissmissals[bowl.bowler] === undefined) {
        dissmissals[bowl.bowler] = {};
      }
      if (dissmissals[bowl.bowler][bowl.batsman] === undefined) {
        dissmissals[bowl.bowler][bowl.batsman] = 0;
      }
      dissmissals[bowl.bowler][bowl.batsman]++;
    }
  }
  let highestDissmissal = { bowler: "", batsman: "", dissmissals: 0 };

  for (bowler in dissmissals) {
    let player = "";
    let playerDissmissals = 0;
    for (batsman in dissmissals[bowler]) {
      if (dissmissals[bowler][batsman] >= playerDissmissals) {
        player = batsman;
        playerDissmissals = dissmissals[bowler][batsman];
      }
    }
    dissmissals[bowler] = { [player]: playerDissmissals };
    if (playerDissmissals >= highestDissmissal.dissmissals) {
      highestDissmissal = {
        bowler: bowler,
        batsman: player,
        dissmissals: playerDissmissals,
      };
    }
  }

  return highestDissmissal;
};
console.log(highestNumberOfDissmissal());
module.exports = { highestNumberOfDissmissal };
