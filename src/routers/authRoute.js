import Router from 'express';
import authControler from '../controlers/authControler.js';

const router = new Router();

router.post('/signup', authControler.signUp);
router.post('/login', authControler.logIn);
router.post('/logout', authControler.logOut);
router.get('/refresh', authControler.refresh);

export default router;
