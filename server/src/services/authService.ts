import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { models } from '../models';
import { User, UserAttributes } from '../models/user';

const { User: UserModel } = models;

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: 'user' | 'admin'
): Promise<User> => {
  const user = await UserModel.findOne({ where: { email } });
  if (user) {
    throw new Error('Email already registered.');
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return await UserModel.create({
    name,
    email,
    password: hashedPassword,
    role,
  });
};

export const loginUser = async (email: string, password: string): Promise<{ user: UserAttributes, token: string }> => {
  const user = (await UserModel.findOne({ where: { email } }))?.get({ plain: true });

  if (!user) {
    throw new Error('Invalid email.');
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error('Invalid password.');
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  return { user, token };
};
