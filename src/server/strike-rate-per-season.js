const { CsvToJson } = require("./csvToJson");

const strikeRatePerSeason = () => {
  const matchData = CsvToJson("../data/matches.csv");
  const deliveriesData = CsvToJson("../data/deliveries.csv");

  matchIdSeasonMap = {};
  for (match of matchData) {
    matchIdSeasonMap[match.id] = match.season;
  }
  const strikeRatePerYear = {};
  for (bowl of deliveriesData) {
    const season = matchIdSeasonMap[bowl.match_id];
    if (strikeRatePerYear[bowl.batsman] === undefined) {
      strikeRatePerYear[bowl.batsman] = {};
    }
    if (strikeRatePerYear[bowl.batsman][season] === undefined) {
      strikeRatePerYear[bowl.batsman][season] = [0, 0];
    }
    strikeRatePerYear[bowl.batsman][season][0] += parseInt(bowl.batsman_runs);
    strikeRatePerYear[bowl.batsman][season][1]++;
  }

  for (player in strikeRatePerYear) {
    for (seaon in strikeRatePerYear[player]) {
      strikeRatePerYear[player][seaon] = (
        (strikeRatePerYear[player][seaon][0] /
          strikeRatePerYear[player][seaon][1]) *
        100
      ).toFixed(2);
    }
  }
  return strikeRatePerYear;
};
console.log(strikeRatePerSeason());
module.exports = { strikeRatePerSeason };
