import { Router } from 'express';
import { createPoll, listPolls, resultPoll } from './controllers/pollControllers.js';
import { createChoice, votes, listChoices  } from './controllers/choiceControllers.js';
const router = Router()

router.post('/poll', createPoll)
router.get('/poll', listPolls)
router.get('/poll/:id/choice', listChoices)
router.get('/poll/:id/result', resultPoll)
router.post('/choice', createChoice)
router.post('/choice/:id/vote', votes )


export default router;