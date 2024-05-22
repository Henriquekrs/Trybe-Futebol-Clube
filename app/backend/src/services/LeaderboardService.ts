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
  resultWins,
  sortLeaderboard,
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
      totalPoints: (resultPoints(team.id, finishMatches)),
      totalGames: resultGames(team.id, finishMatches),
      totalVictories: resultWins(team.id, finishMatches),
      totalDraws: resultDraws(team.id, finishMatches),
      totalLosses: resultLosses(team.id, finishMatches),
      goalsFavor: resultGoalsFavor(team.id, finishMatches),
      goalsOwn: resultGoalsOwn(team.id, finishMatches),
      goalsBalance: resultGoalsBalance(team.id, finishMatches),
      efficiency: resEff(team.id, finishMatches),
    }));

    const order = sortLeaderboard(homeMatches);

    return { status: 'SUCCESSFUL', data: order };
  }
}
