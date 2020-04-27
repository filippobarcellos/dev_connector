/* eslint-disable import/named */
import { Router } from 'express';

import auth from '../middlewares/auth';
import { validateProfile } from '../middlewares/validators/profileValidator';

import profileController from '../controllers/profile.controller';

const routes = Router();

routes.get('/:id', auth, profileController.getProfile);
routes.get('/', auth, profileController.getAllProfiles);
routes.post('/', auth, validateProfile, profileController.createProfile);

export default routes;
