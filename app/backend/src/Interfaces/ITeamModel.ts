import { ITeam } from './ITeam';

export interface IteamModel {
  getAll(): Promise<ITeam[]>;
  getById(id: number): Promise<ITeam | null>;
}
