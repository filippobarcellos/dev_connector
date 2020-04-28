/* eslint-disable import/named */
import { Router } from 'express';

import auth from '../middlewares/auth';
import { validateProfile } from '../middlewares/validators/profileValidator';

import profileController from '../controllers/profile.controller';

const routes = Router();

routes.get('/:id', auth, profileController.getProfile);
routes.get('/', auth, profileController.getAllProfiles);
routes.post('/', auth, validateProfile, profileController.createProfile);
routes.delete('/', auth, profileController.deleteProfile);

routes.put('/:id/experience', auth, profileController.addExperience);
routes.delete(
  '/:id/experience/:expId',
  auth,
  profileController.deleteExperience,
);

routes.put('/:id/education', auth, profileController.addEducation);
routes.delete(
  '/:id/education/:educId',
  auth,
  profileController.deleteEducation,
);

routes.get('/:id/github/:username', profileController.getGithubRepos);
export default routes;
