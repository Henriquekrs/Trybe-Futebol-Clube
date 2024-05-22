export const resultPoints = (id: any, partida: any) => {
  const totalWins = partida.filter(
    (match: any) => match.homeTeamId === id && match.homeTeamGoals > match.awayTeamGoals,
  );
  return totalWins.length;
};

export const resultTotalGames = (id: any, partida: any) => {
  const totalGames = partida.filter((match: any) => match.homeTeamId === id);
  return totalGames.length;
};

export const resultDraws = (id: any, partida: any) => {
  const totalDraws = partida.filter(
    (match: any) => match.homeTeamId === id && match.homeTeamGoals === match.awayTeamGoals,
  );
  return totalDraws.length;
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

  console.log(totalOwn);
  return totalOwn;
};

export const orderLeaderboard = (matches: any) => {
  const data = matches.sort((a: any, b: any) => {
    if (b.totalPoints !== a.totalPoints) {
      return b.totalPoints - a.totalPoints; // Total de pontos (decrescente)
    }
    if (b.totalVictories !== a.totalVictories) {
      return b.totalVictories - a.totalVictories; // Total de vitórias (decrescente)
    }
    if (b.goalDifference !== a.goalDifference) {
      return b.goalDifference - a.goalDifference; // Saldo de gols (decrescente)
    }
    return b.goalsFavor - a.goalsFavor; // Gols a favor (decrescente)
  });
  return data;
};
