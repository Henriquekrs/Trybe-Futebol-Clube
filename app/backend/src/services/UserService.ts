import * as jwt from 'jsonwebtoken';
import jwtSecret from '../config/jwtConfig';
import UserModel from '../models/UserModel';
import {
  ServiceResponseError,
  ServiceResponseRole,
  ServiceResponseToken,
} from '../types/ServiceResponse';

export default class UserService {
  constructor(
    private userModel = new UserModel(),
  ) { }

  async login(email: string):
  Promise<ServiceResponseToken | ServiceResponseError> {
    const dbData = await this.userModel.login(email);
    const payload = {
      id: dbData?.id,
      email: dbData?.email,
    };
    if (!dbData) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: '1h',
      algorithm: 'HS256',
    });
    return { status: 'SUCCESSFUL', data: { token } };
  }

  async getRole(email: string): Promise<ServiceResponseRole | ServiceResponseError> {
    const user = await this.userModel.login(email);
    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid token' } };
    }
    return { status: 'SUCCESSFUL', data: { role: user?.role },
    };
  }
}
