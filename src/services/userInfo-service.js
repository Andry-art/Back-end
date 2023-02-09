import HistoryOfSteps from '../models/HistoryOfSteps.js';

class userInfoService {
  async getHistorySteps(id) {
    const user = await HistoryOfSteps.find({ userId: id });
    return user;
  }

  async postNewSteps(userId, date, steps, tokens) {
    const stepDate = await HistoryOfSteps.find({ date, userId });
    if (stepDate.length) {
      return;
    }
    const newStep = await HistoryOfSteps.create({ userId, date, steps, tokens });
    return newStep;
  }
}

export default new userInfoService();
