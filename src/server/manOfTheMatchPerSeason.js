const { CsvToJson } = require("./csvToJson");

const manOfTheMatchPerSeason = (matches) => {
  const manOfTheMatcheWonPerYear = {};
  for (match of matches) {
    if (match.result == "no result") {
      continue;
    }
    if (manOfTheMatcheWonPerYear[match.season] === undefined) {
      manOfTheMatcheWonPerYear[match.season] = {};
    }
    if (
      manOfTheMatcheWonPerYear[match.season][match.player_of_match] ===
      undefined
    ) {
      manOfTheMatcheWonPerYear[match.season][match.player_of_match] = 0;
    }
    manOfTheMatcheWonPerYear[match.season][match.player_of_match]++;
  }
  for (let season in manOfTheMatcheWonPerYear) {
    let topPlayer = "";
    let manOfTheMatchCount = 0;
    for (let player in manOfTheMatcheWonPerYear[season]) {
      if (manOfTheMatcheWonPerYear[season][player] >= manOfTheMatchCount) {
        topPlayer = player;
        manOfTheMatchCount = manOfTheMatcheWonPerYear[season][player];
      }
      manOfTheMatcheWonPerYear[season] = player;
    }
  }
  return manOfTheMatcheWonPerYear;
};
console.log(manOfTheMatchPerSeason());
module.exports = { manOfTheMatchPerSeason };
