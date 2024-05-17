import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  async login(req: Request, res: Response) {
    const { email } = req.body;
    const serviceResponse = await this.userService.login(email);
    if (serviceResponse.status === 'UNAUTHORIZED') {
      res.status(404).json(serviceResponse.data);
      return;
    }
    res.status(200).json(serviceResponse.data);
  }

  async getRole(req: Request, res: Response) {
    const { email } = req.cookies;
    const serviceResponse = await this.userService.getRole(email);
    res.status(200).json(serviceResponse.data);
  }
}
