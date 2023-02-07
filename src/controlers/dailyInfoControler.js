import userInfoService from '../services/userInfo-service.js';

class dailyInfoControler {
  async getInfo(req, res, next) {
    try {
      const { id } = req.body;
      console.log(id, 'datdatdat');
      const userData = await userInfoService.getDailyInfo(id);
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

}

export default new dailyInfoControler();