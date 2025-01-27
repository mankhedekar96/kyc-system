import { Response } from 'express';

class ErrorHandler extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

const handleError = (err: ErrorHandler, res: Response) => {
  const { statusCode, message } = err;
  res.status(statusCode || 500).json({
    status: 'error',
    statusCode: statusCode || 500,
    message: message || 'Internal Server Error',
  });
};

export { ErrorHandler, handleError };
