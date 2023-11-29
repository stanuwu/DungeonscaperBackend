import { Router } from 'express';

import UserController from '../controllers/UserController';

const router = Router();

router.post('/get', UserController.getUser);

router.post('/session', UserController.createSession);

export default router;
