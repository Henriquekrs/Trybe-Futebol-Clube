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

  async finishMatch(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const serviceResponse = await this.matchesService.finishMatch(Number(id));
      return res.status(200).json(serviceResponse.data);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao finalizar partida' });
    }
  }

  async updateMatch(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const serviceResponse = await
      this.matchesService.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
      return res.status(200).json(serviceResponse.data);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar partida' });
    }
  }
}
