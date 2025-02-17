const extraRunConcededPerTeam = (matches, deliveries, year) => {
  matchIdSeasonMap = {};
  matches.map((match) => {
    matchIdSeasonMap[match.id] = match.season;
  });
  const extraRunsPerYear = deliveries.reduce((accumulator, delivery) => {
    const season = matchIdSeasonMap[delivery.match_id];
    if (season == year) {
      accumulator[delivery.bowling_team] =
        (accumulator[delivery.bowling_team] || 0) +
        parseInt(delivery.extra_runs);
    }
    return accumulator;
  }, {});

  return extraRunsPerYear;
};
module.exports = { extraRunConcededPerTeam };
