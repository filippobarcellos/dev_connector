/* eslint-disable import/named */
import { Router } from 'express';

// import { validateUser } from '../middlewares/validators/userValidator';

import sessionController from '../controllers/session.controller';

const routes = Router();

routes.post('/', sessionController.createSession);

export default routes;
