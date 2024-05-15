import { ITeam } from './ITeam';

export interface IteamModel {
  getAll(): Promise<ITeam[]>;
}
