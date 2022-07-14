import { Router } from 'express';
import { createPoll, listPolls, listChoices } from './controllers/pollControllers.js';
import { createChoice, votes } from './controllers/choiceControllers.js';
const router = Router()

router.post('/poll', createPoll)
router.get('/poll', listPolls)
router.get('/poll/:id/choice', listChoices)
router.post('/choice', createChoice)
router.post('/choice/:id/vote', votes )


export default router;