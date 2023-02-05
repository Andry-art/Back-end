import userService from '../services/user-service.js';

class authControler {
  async signUp(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.signUp(email, password);
      res.cookie('refreshToken', userData.refreshRoken, {
        maxAge: 120 * 24 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json(userData);
    } catch (e) {
      next(e);
      // res.status(400).json({ message: 'Registration Error' });
    }
  }

  async logIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.logIn(email, password);
      res.cookie('refreshToken', userData.refreshRoken, {
        maxAge: 120 * 24 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json(userData);
    } catch (e) {
      next(e);
      // res.status(400).json({ message: 'LogIn Error' });
    }
  }

  async logOut(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = userService.logOut(refreshToken);
      res.clearCookie('refreshToken');
      return res.status(200).json(token);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshRoken, {
        maxAge: 120 * 24 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json(userData);
    } catch (e) {
      next(e);
    }
  }
}

export default new authControler();
