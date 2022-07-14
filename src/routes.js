import { Router } from 'express';
import { createPoll, listPolls } from './controllers/pollControllers.js';
import { createChoice } from './controllers/choiceControllers.js';
const router = Router()

router.post('/poll', createPoll)
router.get('/poll', listPolls)
router.post('/choice', createChoice)


export default router;