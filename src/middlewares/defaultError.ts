import { Request, Response } from 'express';

interface IError extends Error {
  status?: number;
}

const defaultError = (
  error: IError,
  req: Request,
  res: Response
): Response | void => {
  return res.status(error.status || 500).json({
    error: {
      type: 'server',
      field: 'modal',
      message: error,
    },
  });
};

export default defaultError;
