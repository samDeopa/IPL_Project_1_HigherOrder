const { CsvToJson } = require("./csvToJson");
const { writeToFile } = require("./writeToFile");

const manOfTheMatchPerSeason = () => {
  const matches = CsvToJson("../data/matches.csv");
  const manOfTheMatcheWonPerYear = matches.reduce((accumulator, match) => {
    if (match.result == "no result") {
      return accumulator;
    }
    const season = match.season;
    const player = match.player_of_match;
    if (accumulator[season] === undefined) {
      accumulator[season] = {};
    }

    accumulator[season][player] = (accumulator[season][player] || 0) + 1;
    return accumulator;
  }, {});

  const season = Object.keys(manOfTheMatcheWonPerYear);
  const mostManOfTheMatch = season.reduce((accumulator, season) => {
    const players = Object.keys(manOfTheMatcheWonPerYear[season]);
    const topPlayer = players.reduce(
      (accumulator, player) => {
        return accumulator.manOfTheMatches >
          manOfTheMatcheWonPerYear[season][player]
          ? accumulator
          : {
              season: season,
              player: player,
              manOfTheMatches: manOfTheMatcheWonPerYear[season][player],
            };
      },
      { season: "", player: "", manOfTheMatches: 0 }
    );
    accumulator[topPlayer.season] = topPlayer.player;
    return accumulator;
  }, {});

  writeToFile("man_of_the_match_per_year", JSON.stringify(mostManOfTheMatch));
  return mostManOfTheMatch;
};
console.log(manOfTheMatchPerSeason());
module.exports = { manOfTheMatchPerSeason };
