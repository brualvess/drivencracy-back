import { Router } from 'express';
import { createPoll, listPolls } from './controllers/pollControllers.js';

const router = Router()

router.post('/poll', createPoll)
router.get('/poll', listPolls)


export default router;