import MatchesModel from '../models/MatchesModel';
import { IMatchesModel } from '../Interfaces/IMatchesModel';
import {
  ServiceResponse,
  ServiceResponseError,
  ServiceResponseFinished,
} from '../types/ServiceResponse';
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

  async finishMatch(matchId: number): Promise<ServiceResponseFinished | ServiceResponseError> {
    const match = await this.matchesModel.getById(matchId);
    if (!match) {
      return { status: 'NOT_FOUND', data: { message: `Matche ${matchId} not found` } };
    }

    if (match.inProgress !== true) {
      return { status: 'CONFLICT', data: { message: 'Match is not in progress' } };
    }

    await this.matchesModel.finishMatch(matchId);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<ServiceResponseFinished | ServiceResponseError> {
    const match = await this.matchesModel.getById(id);
    if (!match) {
      return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };
    }

    if (match.inProgress !== true) {
      return { status: 'CONFLICT', data: { message: 'Match is not in progress' } };
    }

    await this.matchesModel.updateMatch(id, homeTeamGoals, awayTeamGoals);
    return { status: 'SUCCESSFUL', data: { message: 'Goool' } };
  }
}
