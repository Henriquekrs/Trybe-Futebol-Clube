import SequelizeMatchesModel from '../database/models/SequelizeMatchesModel';

export interface IMatchesModel {
  getAllMatches(): Promise<SequelizeMatchesModel[]>;
}
