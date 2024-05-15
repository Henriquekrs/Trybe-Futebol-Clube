import { ITeam } from '../Interfaces/ITeam';
import SequelizeTeamModel from '../database/models/SequelizeTeamModel';
import { IteamModel } from '../Interfaces/ITeamModel';

export default class TeamModel implements IteamModel {
  private model = SequelizeTeamModel;

  async getAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }

  async getById(id: number): Promise<ITeam | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData === null) return null;
    return dbData;
  }
}
