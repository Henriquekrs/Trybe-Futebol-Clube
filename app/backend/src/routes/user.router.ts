import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import validateLogin from '../middlewares/validateLogin';
import validateToken from '../middlewares/validateToken';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  validateLogin.validateInputs,
  validateLogin.validateCredentials,
  (req: Request, res: Response) => userController.login(req, res),
);

router.get(
  '/role',
  validateToken,
  (req: Request, res: Response) => userController.getRole(req, res),
);

export default router;
