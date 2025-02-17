const matchesPerYear = (matches) => {
  const matchesPerYear = matches.reduce((accumulator, match) => {
    accumulator[match.season] = (accumulator[match.season] || 0) + 1;
    return accumulator;
  }, {});

  return matchesPerYear;
};
console.log(matchesPerYear());
module.exports = { matchesPerYear };
