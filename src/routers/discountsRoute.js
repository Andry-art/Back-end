import Router from 'express';
import discountControler from '../controlers/discountControler.js';

const router = new Router();

router.post('/newdiscount', discountControler.createDiscount);
// router.get('/getdiscounts', discountControler.getAllDiscounts);

export default router;
