import * as bcrypt from 'bcryptjs';
import { RequestHandler } from 'express';
import UserModel from '../models/UserModel';

const validateInputs: RequestHandler = (req, res, next) => {
  const regex = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'All fields must be filled' });
    return;
  }
  if (!regex.test(email)) {
    res.status(400).json({ message: 'Invalid email' });
    return;
  }
  if (password.length < 6) {
    res.status(400).json({ message: 'Password must be at least 6 characters' });
    return;
  }
  next();
};

const validateCredentials: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  const userModel = new UserModel();
  const dbResponse = await userModel.login(email);
  const comparePassword = bcrypt.compareSync(password, dbResponse?.password ?? '');
  if (!dbResponse) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  if (!comparePassword) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
};

export default {
  validateInputs,
  validateCredentials,
};
