import { CreatedMatch } from '../types/ServiceResponse';
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

  async getById(id: number): Promise<SequelizeMatchesModel | null> {
    const dbData = await this.model.findByPk(id);
    if (!dbData) {
      return null;
    }
    return dbData;
  }

  async finishMatch(matchId: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id: matchId } });
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void> {
    await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }

  async createMatch(matchData: {
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  }): Promise<CreatedMatch> {
    const dbData = await this.model.create({
      ...matchData,
      inProgress: true,
    });
    return dbData;
  }
}
