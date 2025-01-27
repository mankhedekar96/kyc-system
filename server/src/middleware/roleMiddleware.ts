import { Request, Response, NextFunction } from 'express';

const roleMiddleware = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== requiredRole) {
      return res.status(403).send('Access Denied');
    }
    next();
  };
};

export default roleMiddleware;
