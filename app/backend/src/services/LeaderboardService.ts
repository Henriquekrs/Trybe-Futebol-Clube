import TeamModel from '../models/TeamModel';
import MatchesModel from '../models/MatchesModel';
import { IteamModel } from '../Interfaces/ITeamModel';
import { IMatchesModel } from '../Interfaces/IMatchesModel';
import {
  resultTotalGames,
  resultPoints,
  resultDraws,
  resultLosses,
  resultGoalsFavor,
  resultGoalsOwn,
  orderLeaderboard,
} from '../utils/leaderboarderFunctions';

export default class LeaderboardService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
    private teamModel: IteamModel = new TeamModel(),
  ) { }

  async getLeaderboard() {
    const dbMatches = await this.matchesModel.getAllMatches();
    const dbTeams = await this.teamModel.getAll();
    const finishMatches = dbMatches.filter((match) => match.inProgress === false);

    const homeMatches = dbTeams.map((team) => ({
      name: team.teamName,
      totalPoints: (resultPoints(team.id, finishMatches) * 3),
      totalGames: resultTotalGames(team.id, finishMatches),
      totalVictories: resultPoints(team.id, finishMatches),
      totalDraws: resultDraws(team.id, finishMatches),
      totalLosses: resultLosses(team.id, finishMatches),
      goalsFavor: resultGoalsFavor(team.id, finishMatches),
      goalsOwn: resultGoalsOwn(team.id, finishMatches),
    }));

    const order = orderLeaderboard(homeMatches);

    return { status: 'SUCCESSFUL', data: order };
  }
}
