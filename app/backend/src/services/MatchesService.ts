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
}
