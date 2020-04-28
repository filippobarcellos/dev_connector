import { Router } from 'express';

import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import profileRoutes from './profile.routes';
import postRoutes from './post.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/sessions', authRoutes);
routes.use('/profiles', profileRoutes);
routes.use('/posts', postRoutes);

export default routes;
