import { ILeaderboard } from '../Interfaces/ILeaderBoardService';
import { IMatches } from '../Interfaces/IMatches';

const getTeamMatches = (id: number, matches: IMatches[], isHome: boolean) => {
  const totalGames = matches.filter(
    (match) => (isHome ? match.homeTeamId === id : match.awayTeamId === id),
  );
  return totalGames;
};

export const resultWins = (id: number, matches: IMatches[], isHome: boolean) => {
  const totalWins = matches.filter(
    (match) => (isHome
      ? match.homeTeamId === id && match.homeTeamGoals > match.awayTeamGoals
      : match.awayTeamId === id && match.awayTeamGoals > match.homeTeamGoals),
  );
  return totalWins.length;
};

export const resultGames = (id: number, matches: IMatches[], isHome: boolean) => {
  const totalGames = getTeamMatches(id, matches, isHome).length;
  return totalGames;
};

export const resultDraws = (id: number, matches: IMatches[], isHome: boolean) => {
  const totalDraws = matches.filter(
    (match) => (isHome
      ? match.homeTeamId === id && match.homeTeamGoals === match.awayTeamGoals
      : match.awayTeamId === id && match.awayTeamGoals === match.homeTeamGoals),
  );
  return totalDraws.length;
};

export const resultPoints = (id: number, matches: IMatches[], isHome: boolean) => {
  const wins = resultWins(id, matches, isHome);
  const draws = resultDraws(id, matches, isHome);
  return (wins * 3) + draws;
};

export const resultLosses = (id: number, matches: IMatches[], isHome: boolean) => {
  const totalLosses = matches.filter(
    (match) => (isHome
      ? match.homeTeamId === id && match.homeTeamGoals < match.awayTeamGoals
      : match.awayTeamId === id && match.awayTeamGoals < match.homeTeamGoals),
  );
  return totalLosses.length;
};

export const resultGoalsFavor = (id: number, matches: IMatches[], isHome: boolean) => {
  const totalGoalsFavor = getTeamMatches(id, matches, isHome)
    .reduce((acc: number, match) => acc + (isHome ? match.homeTeamGoals : match.awayTeamGoals), 0);

  return totalGoalsFavor;
};

export const resultGoalsOwn = (id: number, matches: IMatches[], isHome: boolean) => {
  const totalOwn = getTeamMatches(id, matches, isHome)
    .reduce((acc: number, match) => acc + (isHome ? match.awayTeamGoals : match.homeTeamGoals), 0);

  return totalOwn;
};

export const resultGoalsBalance = (id: number, matches: IMatches[], isHome: boolean) => {
  const balanceGoals = getTeamMatches(id, matches, isHome)
    .reduce((acc: number, match) =>
      acc + ((isHome ? match.homeTeamGoals : match.awayTeamGoals)
      - (isHome ? match.awayTeamGoals : match.homeTeamGoals)), 0);
  return balanceGoals;
};

export const resEff = (id: number, matches: IMatches[], isHome: boolean) => {
  const totalPoints = resultPoints(id, matches, isHome);
  const totalGames = resultGames(id, matches, isHome);
  const efficiency = (totalPoints / (totalGames * 3)) * 100;
  return efficiency.toFixed(2);
};

export const sortLeaderboard = (leaderboard: ILeaderboard[]) => {
  const sortData = leaderboard.sort((a, b) => {
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
  return sortData;
};
