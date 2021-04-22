import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../configs/auth';

interface IDecoded {
  id: number;
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = ((await promisify(jwt.verify)(
      token,
      // @ts-ignore
      authConfig.secret
    )) as unknown) as IDecoded;

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};

export default authMiddleware;
