import { Router } from 'express';
import multer from 'multer';

import authMiddleware from './middlewares/auth';
import defaultError from './middlewares/defaultError';
import notFound from './middlewares/notFound';

const routes = Router();

// Others routes
routes.use(notFound);
routes.use(defaultError as any);

export default routes;
