import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import validateLogin from '../middlewares/validateLogin';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  validateLogin.validateInputs,
  validateLogin.validateCredentials,
  (req: Request, res: Response) => userController.login(req, res),
);

export default router;
