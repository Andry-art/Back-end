import HistoryOfSteps from '../models/HistoryOfSteps.js';

class userInfoService {
  async getHistorySteps(id) {
    const user = await HistoryOfSteps.find({ userId: id });
    return user;
  }

  async postNewSteps(data) {
    const query = { userId: data.userId, date: data.date };
    const update = { steps: data.steps, tokens: data.tokens };
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
