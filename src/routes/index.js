import { Router } from 'express';

import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import profileRoutes from './profile.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/sessions', authRoutes);
routes.use('/profiles', profileRoutes);

export default routes;
