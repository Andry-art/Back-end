import Router from 'express';
import stepsHistory from '../controlers/stepsHistory.js';

const router = new Router();

router.get('/todayinfo', stepsHistory.getInfo);

export default router;
