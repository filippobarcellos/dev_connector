import { Router } from 'express';

import userRoutes from './user.routes';
import authRoutes from './auth.routes';

const routes = Router();

routes.use('/users', userRoutes);
// routes.use('/sessions', authRoutes);

export default routes;
