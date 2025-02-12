const { CsvToJson } = require("./csvToJson");
const { writeToFile } = require("./writeToFile");

const strikeRatePerSeason = () => {
  const matches = CsvToJson("../data/matches.csv");
  const deliveries = CsvToJson("../data/deliveries.csv");

  matchIdSeasonMap = {};
  matches.map((match) => {
    matchIdSeasonMap[match.id] = match.season;
  });
  let strikeRatePerYear = deliveries.reduce((accumulator, delivery) => {
    const season = matchIdSeasonMap[delivery.match_id];
    const batsman = delivery.batsman;
    if (accumulator[batsman] === undefined) {
      accumulator[batsman] = {};
    }
    if (accumulator[batsman][season] === undefined) {
      accumulator[batsman][season] = [0, 0];
    }
    accumulator[batsman][season][0] =
      accumulator[batsman][season][0] + parseInt(delivery.batsman_runs);
    accumulator[batsman][season][1] = accumulator[batsman][season][1] + 1;
    return accumulator;
  }, {});
  const players = Object.keys(strikeRatePerYear);
  strikeRatePerYear = players.reduce((accumulator, batsman) => {
    const seasons = Object.keys(strikeRatePerYear[batsman]);
    accumulator[batsman] = seasons.reduce((accumulator, season) => {
      accumulator[season] = Math.floor(
        (strikeRatePerYear[batsman][season][0] /
          strikeRatePerYear[batsman][season][1]) *
          100
      );
      return accumulator;
    }, {});
    return accumulator;
  }, {});

  writeToFile("strike_rate_per_season", JSON.stringify(strikeRatePerYear));
  return strikeRatePerYear;
};
console.log(strikeRatePerSeason());
module.exports = { strikeRatePerSeason };
