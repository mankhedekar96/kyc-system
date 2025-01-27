import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await registerUser(name, email, password, role);

    res.status(201).json({ 
      message: 'User registered successfully', 
      user: user.get({ plain: true })
    });
  } catch (error: any) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unexpected error occurred' });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userObj = await loginUser(email, password);
    res.status(200).json({ message: 'Login successful', ...userObj });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unexpected error occurred' });
    }
  }
};

