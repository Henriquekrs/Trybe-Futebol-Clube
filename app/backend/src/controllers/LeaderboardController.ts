import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  async getLeaderboardHome(req: Request, res: Response) {
    const leaderboard = await this.leaderboardService.getLeaderboard(true);
    return res.status(200).json(leaderboard.data);
  }

  async getLeaderboardAway(req: Request, res: Response) {
    const leaderboard = await this.leaderboardService.getLeaderboard(false);
    return res.status(200).json(leaderboard.data);
  }
}
