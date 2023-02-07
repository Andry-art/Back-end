import Router from 'express';
import dailyInfoControler from '../controlers/dailyInfoControler.js';

const router = new Router();

router.post('/todayinfo', dailyInfoControler.getInfo);

export default router;
