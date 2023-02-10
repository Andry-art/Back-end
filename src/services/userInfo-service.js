import HistoryOfSteps from '../models/HistoryOfSteps.js';

class userInfoService {
  async getHistorySteps(id) {
    const user = await HistoryOfSteps.find({ userId: id });
    return user;
  }

  async postNewSteps(data) {
    const parsData = JSON.parse(data)
    const query = { userId: parsData.userId, date: parsData.date };
    const update = { steps: parsData.steps, tokens: parsData.tokens };
    const item = await HistoryOfSteps.findOne(query);
    console.log(item);
    if (item) {
      await HistoryOfSteps.updateOne(query, update);
    }
    if (!item) {
      await HistoryOfSteps.create(data);
    }
  }
}

export default new userInfoService();
