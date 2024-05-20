import SequelizeMatchesModel from '../database/models/SequelizeMatchesModel';
import { IMatchesModel } from '../Interfaces/IMatchesModel';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatchesModel;

  async getAllMatches(): Promise<SequelizeMatchesModel[]> {
    const dbData = await this.model.findAll({
      include: [
        { association: 'homeTeam',
          attributes: ['teamName'],
        },
        { association: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return dbData;
  }
}
