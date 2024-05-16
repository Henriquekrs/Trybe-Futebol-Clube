import * as jwt from 'jsonwebtoken';
import jwtSecret from '../config/jwtConfig';
import UserModel from '../models/UserModel';
import { ServiceResponseError, ServiceResponseToken } from '../types/ServiceResponse';

export default class UserService {
  constructor(
    private userModel = new UserModel(),
  ) { }

  async login(email: string):
  Promise<ServiceResponseToken | ServiceResponseError> {
    const dbData = await this.userModel.login(email);
    if (!dbData) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const token = jwt.sign({ id: dbData.id, email: dbData.email }, jwtSecret, {
      expiresIn: '1h',
    });
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
