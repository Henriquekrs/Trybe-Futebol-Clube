import SequelizeUserModel from '../database/models/SequelizeUserModel';
import { IUserModel } from '../Interfaces/IUserModel';
import { IUser } from '../Interfaces/IUser';

export default class UserModel implements IUserModel {
  private model = SequelizeUserModel;

  async login(email: string): Promise<IUser | null> {
    const dbData = await this.model.findOne({ where: { email } });
    if (!dbData) {
      return null;
    }
    return dbData;
  }
}
