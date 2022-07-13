import { Router } from 'express';
import { createPoll } from './controllers/pollControllers.js';

const router = Router()

router.post('/poll', createPoll)


export default router;