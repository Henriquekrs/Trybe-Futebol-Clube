import MatchesModel from '../models/MatchesModel';
import { IMatchesModel } from '../Interfaces/IMatchesModel';
import { ServiceResponse } from '../types/ServiceResponse';
import { IMatches } from '../Interfaces/IMatches';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
  ) {}

  async getAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.getAllMatches();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  async getMatchesInProgress(inProgress: string): Promise<ServiceResponse<IMatches[]>> {
    const inProgressBool = inProgress === 'true';
    const dbRespose = await this.matchesModel.getAllMatches();
    const matchesInProgress = dbRespose.filter((match) => (match.inProgress === inProgressBool));
    return { status: 'SUCCESSFUL', data: matchesInProgress };
  }
}
