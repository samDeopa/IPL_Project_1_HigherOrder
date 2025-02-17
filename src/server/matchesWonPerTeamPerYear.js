const matchesWonPerYearPerTeam = (matches) => {
  const matchesWonPerYear = matches.reduce((accumulator, match) => {
    if (match.result == "no result") {
      return accumulator;
    }
    if (accumulator[match.winner] === undefined) {
      accumulator[match.winner] = {};
    }
    accumulator[match.winner][match.season] =
      (accumulator[match.winner][match.season] || 0) + 1;
    return accumulator;
  }, {});
  return matchesWonPerYear;
};
module.exports = { matchesWonPerYearPerTeam };
