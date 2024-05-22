import TeamModel from '../models/TeamModel';
import MatchesModel from '../models/MatchesModel';
import { IteamModel } from '../Interfaces/ITeamModel';
import { IMatchesModel } from '../Interfaces/IMatchesModel';
import {
  resultGames,
  resultPoints,
  resultDraws,
  resultLosses,
  resultGoalsFavor,
  resultGoalsOwn,
  resultGoalsBalance,
  resEff,
  sortLeaderboard,
  resultWins,
} from '../utils/leaderboarderFunctions';
import { ILeaderboard } from '../Interfaces/ILeaderBoardService';
import { ServiceResponseSuccess } from '../types/ServiceResponse';

export default class LeaderboardService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
    private teamModel: IteamModel = new TeamModel(),
  ) { }

  async getLeaderboard(isHome: boolean): Promise<ServiceResponseSuccess<ILeaderboard[]>> {
    const dbMatches = await this.matchesModel.getAllMatches();
    const dbTeams = await this.teamModel.getAll();
    const finishMatches = dbMatches.filter((match) => match.inProgress === false);

    const leaderboard = dbTeams.map((team) => ({
      name: team.teamName,
      totalPoints: resultPoints(team.id, finishMatches, isHome),
      totalGames: resultGames(team.id, finishMatches, isHome),
      totalVictories: resultWins(team.id, finishMatches, isHome),
      totalDraws: resultDraws(team.id, finishMatches, isHome),
      totalLosses: resultLosses(team.id, finishMatches, isHome),
      goalsFavor: resultGoalsFavor(team.id, finishMatches, isHome),
      goalsOwn: resultGoalsOwn(team.id, finishMatches, isHome),
      goalsBalance: resultGoalsBalance(team.id, finishMatches, isHome),
      efficiency: resEff(team.id, finishMatches, isHome),
    }));

    const orderedLeaderboard = sortLeaderboard(leaderboard);

    return { status: 'SUCCESSFUL', data: orderedLeaderboard };
  }
}
