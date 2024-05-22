import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  async getLeaderboard(req: Request, res: Response) {
    const leaderboard = await this.leaderboardService.getLeaderboard();
    return res.status(200).json(leaderboard.data);
  }
}
