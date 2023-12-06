import { Router } from 'express';

import UserController from '../controllers/UserController';

const router = Router();

router.post('/get', UserController.getUser);

router.post('/session', UserController.createSession);

router.get('/join/:identifier', UserController.joinSession);

export default router;
