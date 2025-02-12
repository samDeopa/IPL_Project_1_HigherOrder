const { CsvToJson } = require("./csvToJson");

const strikeRatePerSeason = () => {
  const matchData = CsvToJson("../data/matches.csv");
  const deliveriesData = CsvToJson("../data/deliveries.csv");

  matchIdSeasonMap = {};
  matchData.map((match) => {
    matchIdSeasonMap[match.id] = match.season;
  });
  const strikeRatePerYear = {};
  for (bowl of deliveriesData) {
    const season = matchIdSeasonMap[bowl.match_id];
    if (strikeRatePerYear[bowl.batsman] === undefined) {
      strikeRatePerYear[bowl.batsman] = {};
    }
    if (strikeRatePerYear[bowl.batsman][season] === undefined) {
      strikeRatePerYear[bowl.batsman][season] = 0;
    }
    strikeRatePerYear[bowl.batsman][season] += parseInt(bowl.batsman_runs);
  }

  return strikeRatePerYear;
};
console.log(strikeRatePerSeason());
module.exports = { strikeRatePerSeason };
