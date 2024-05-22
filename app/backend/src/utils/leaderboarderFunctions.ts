export const resultWins = (id: any, partida: any) => {
  const totalWins = partida.filter(
    (match: any) => match.homeTeamId === id && match.homeTeamGoals > match.awayTeamGoals,
  );
  return totalWins.length;
};

export const resultGames = (id: any, partida: any) => {
  const totalGames = partida.filter((match: any) => match.homeTeamId === id);
  return totalGames.length;
};

export const resultDraws = (id: any, partida: any) => {
  const totalDraws = partida.filter(
    (match: any) => match.homeTeamId === id && match.homeTeamGoals === match.awayTeamGoals,
  );
  return totalDraws.length;
};

export const resultPoints = (id: any, partida: any) => {
  const wins = resultWins(id, partida);
  const draws = resultDraws(id, partida);
  return (wins * 3) + draws;
};

export const resultLosses = (id: any, partida: any) => {
  const totalLosses = partida.filter(
    (match: any) => match.homeTeamId === id && match.homeTeamGoals < match.awayTeamGoals,
  );
  return totalLosses.length;
};

export const resultGoalsFavor = (id: any, partida: any) => {
  const totalGoalsFavor = partida
    .filter((match: any) => match.homeTeamId === id)
    .reduce((acc: number, match: any) => acc + match.homeTeamGoals, 0);

  return totalGoalsFavor;
};

export const resultGoalsOwn = (id: any, partida: any) => {
  const totalOwn = partida
    .filter((match: any) => match.homeTeamId === id)
    .reduce((acc: number, match: any) => acc + match.awayTeamGoals, 0);

  return totalOwn;
};

export const resultGoalsBalance = (id: any, partida: any) => {
  const balanceGoals = partida
    .filter((match: any) => match.homeTeamId === id)
    .reduce((acc: number, match: any) => acc + (match.homeTeamGoals - match.awayTeamGoals), 0);
  return balanceGoals;
};

export const resEff = (id: any, partida: any) => {
  const totalPoints = resultPoints(id, partida);
  console.log(totalPoints, '==> total points');
  const totalGames = resultGames(id, partida);
  console.log(totalGames, '==> total games');
  const efficiency = (totalPoints / (totalGames * 3)) * 100;
  return efficiency.toFixed(2);
};

export const sortLeaderboard = (leaderboard: any) => {
  const data = leaderboard.sort((a: any, b: any) => {
    if (a.totalPoints !== b.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    if (a.totalVictories !== b.totalVictories) {
      return b.totalVictories - a.totalVictories;
    }
    if (a.goalsBalance !== b.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    }
    return b.goalsFavor - a.goalsFavor;
  });
  return data;
};
