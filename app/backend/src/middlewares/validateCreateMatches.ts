import { RequestHandler } from 'express';
import SequelizeTeamModel from '../database/models/SequelizeTeamModel';

const validateCreateMatches: RequestHandler = async (req, res, next) => {
  const { homeTeamId, awayTeamId } = req.body;

  if (homeTeamId === awayTeamId) {
    return res.status(422).json(
      { message: 'It is not possible to create a match with two equal teams' },
    );
  }

  const teams = await SequelizeTeamModel.findAll({
    where: {
      id: [homeTeamId, awayTeamId],
    },
  });

  if (teams.length !== 2) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  next();
};

export default validateCreateMatches;
