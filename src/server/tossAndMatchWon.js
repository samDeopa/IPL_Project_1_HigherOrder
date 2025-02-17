const tossAndMatchWon = (matches) => {
  const matchesAndTossWon = matches.reduce((accumulator, match) => {
    if (match.toss_winner == match.winner) {
      accumulator[match.winner] = (accumulator[match.winner] || 0) + 1;
    }
    return accumulator;
  }, {});
  return matchesAndTossWon;
};
console.log(tossAndMatchWon());
module.exports = { tossAndMatchWon };
