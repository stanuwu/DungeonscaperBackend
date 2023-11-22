import { Router } from 'express';

import UserController from '../controllers/UserController';

const router = Router();

router.get('/get', UserController.getUser);

router.get('/session', UserController.createSession);

export default router;
