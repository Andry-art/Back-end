import HistoryOfSteps from '../models/HistoryOfSteps.js';

class userInfoService {
  async getHistorySteps(id) {
    const user = await HistoryOfSteps.find({ userId: id });
    return user;
  }

  async postNewSteps(userId, date, steps, tokens) {
    const query = { userId, date };
    const update = { steps, tokens };
    const item = await HistoryOfSteps.findOne(query);
    console.log(item, 'ddddd');
    if (item) {
      const updated = await HistoryOfSteps.updateOne(query, update);
      console.log(updated, 'sjhvbsrjhvb')
      return updated;
    }
    if (!item) {
      const newItem = await HistoryOfSteps.create({ userId, date, steps, tokens });
      return newItem;
    }
  }
}

export default new userInfoService();
