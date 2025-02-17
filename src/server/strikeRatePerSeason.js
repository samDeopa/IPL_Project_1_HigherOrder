const { csvToJson } = require("./csvToJson.js");
const strikeRatePerSeason = (matches, deliveries) => {
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
      accumulator[batsman][season] = { runs: 0, deliveries: 0 };
    }
    accumulator[batsman][season].runs =
      accumulator[batsman][season].runs + parseInt(delivery.batsman_runs);
    accumulator[batsman][season].deliveries =
      accumulator[batsman][season].deliveries + 1;
    return accumulator;
  }, {});
  const players = Object.keys(strikeRatePerYear);
  strikeRatePerYear = players.reduce((accumulator, batsman) => {
    const seasons = Object.keys(strikeRatePerYear[batsman]);
    accumulator[batsman] = seasons.reduce((accumulator, season) => {
      accumulator[season] = Math.floor(
        (strikeRatePerYear[batsman][season].runs /
          strikeRatePerYear[batsman][season].deliveries) *
          100
      );
      return accumulator;
    }, {});
    return accumulator;
  }, {});

  return strikeRatePerYear;
};
console.log(
  strikeRatePerSeason(
    csvToJson("../data/matches.csv"),
    csvToJson("../data/deliveries.csv")
  )
);
module.exports = { strikeRatePerSeason };
