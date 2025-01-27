import jwt, { SignOptions } from 'jsonwebtoken';

interface CustomPayload {
  id: number;
  role: string;
}

export const generateToken = (payload: CustomPayload, expiresIn = '1h'): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn } as SignOptions);
};
