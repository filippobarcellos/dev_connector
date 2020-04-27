/* eslint-disable import/named */
import { Router } from 'express';

import { validateUser } from '../middlewares/validators/userValidator';

import userController from '../controllers/user.controller';

const routes = Router();

routes.post('/', validateUser, userController.createUser);

export default routes;
