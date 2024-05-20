import SequelizeMatchesModel from '../database/models/SequelizeMatchesModel';

export interface IMatchesModel {
  getAllMatches(): Promise<SequelizeMatchesModel[]>;
  getById(id: number): Promise<SequelizeMatchesModel | null>;
  finishMatch(matchId: number): Promise<void>;
  updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void>;
}
