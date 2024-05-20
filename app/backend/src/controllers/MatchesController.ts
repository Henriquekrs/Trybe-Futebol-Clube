import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  async getAllMatches(req: Request, res: Response) {
    try {
      const { inProgress } = req.query;

      if (inProgress === 'true' || inProgress === 'false') {
        const serviceResponse = await this.matchesService.getMatchesInProgress(inProgress);
        return res.status(200).json(serviceResponse.data);
      }

      const serviceResponse = await this.matchesService.getAllMatches();
      return res.status(200).json(serviceResponse.data);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar partidas' });
    }
  }
}
