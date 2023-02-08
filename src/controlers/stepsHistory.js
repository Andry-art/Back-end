import userInfoService from '../services/userInfo-service.js';

class stepsHistory {
  async getInfo(req, res, next) {
    try {
      const id = req.query.userId;
      console.log(id, 'datdatdat');
      const userData = await userInfoService.getHistorySteps(id);
      return res.status(200).json(userData);
    } catch (e) {
      next(e);
      // res.status(400).json({ message: 'Registration Error' });
    }
  }

  async postNewItem(req, res, next) {
    try {
      const { userId, date, steps, tokens } = req.body;
      // console.log(userId, 'datdatdat');
      const stepsData = await userInfoService.postNewSteps(userId, date, steps, tokens);

      return res.status(200).json(stepsData);
    } catch (e) {
      next(e);
      // res.status(400).json({ message: 'Registration Error' });
    }
  }
}

export default new stepsHistory();
