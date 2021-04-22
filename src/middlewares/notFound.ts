import { Request, Response, NextFunction } from 'express';

interface IError extends Error {
  status?: number;
}

const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error: IError = new Error('Rota não encontrada');
  error.status = 401;
  next(error);
};

export default notFound;
