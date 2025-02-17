const { CsvToJson } = require("./csvToJson");

const mostMomPerTeam = (matches) => {
  const momPerTeam = matches.reduce((accumulator, match) => {
    const winner = match.winner;
    if (!winner) {
      return accumulator;
    }
    if (accumulator[winner] === undefined) {
      accumulator[winner] = {};
    }
    accumulator[winner][match.player_of_match] =
      (accumulator[winner][match.player_of_match] || 0) + 1;
    return accumulator;
  }, {});
  const teams = Object.keys(momPerTeam);
  const mostMomInTeam = teams.reduce((accumulator, team) => {
    const players = Object.keys(momPerTeam[team]);
    const mostMom = players.reduce(
      (accumulator, player) => {
        if (momPerTeam[team][player] >= accumulator.mom) {
          accumulator.player = player;
          accumulator.mom = momPerTeam[team][player];
        }
        return accumulator;
      },
      { player: "", mom: 0 }
    );
    accumulator[team] = mostMom;
    return accumulator;
  }, {});

  console.log(mostMomInTeam);
};
const matches = CsvToJson("../data/matches.csv");
mostMomPerTeam(matches);
