import { IUser } from './IUser';

export interface IUserModel {
  login(parameter: string): Promise<IUser | null>;
}
