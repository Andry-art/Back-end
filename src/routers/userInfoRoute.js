import Router from 'express';
import stepsHistory from '../controlers/stepsHistory.js';

const router = new Router();

router.get('/userhistory', stepsHistory.getInfo);
router.post('/newstepitem', stepsHistory.postNewItem);

export default router;
