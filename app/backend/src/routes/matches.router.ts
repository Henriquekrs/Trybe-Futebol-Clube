import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import validateToken from '../middlewares/validateToken';
import validateCreateMatches from '../middlewares/validateCreateMatches';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));
router.post(
  '/',
  validateToken,
  validateCreateMatches,
  (req: Request, res: Response) => matchesController.createMatches(req, res),
);
router.patch(
  '/:id/finish',
  validateToken,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);
router.patch(
  '/:id',
  validateToken,
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
);

export default router;
