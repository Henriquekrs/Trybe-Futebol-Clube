import TeamModel from '../models/TeamModel';
import { IteamModel } from '../Interfaces/ITeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponde';
import { ITeam } from '../Interfaces/ITeam';

export default class TeamService {
  constructor(
    private teamModel: IteamModel = new TeamModel(),
  ) { }

  async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.getAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }
}
