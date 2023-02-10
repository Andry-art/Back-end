import HistoryOfSteps from '../models/HistoryOfSteps.js';

class userInfoService {
  async getHistorySteps(id) {
    const user = await HistoryOfSteps.find({ userId: id });
    return user;
  }

  async postNewSteps(userId, date, steps, tokens) {
    const query = { userId, date };
    const item = await HistoryOfSteps.findOne(query);
    console.log(item, 'ddddd');
    if (item) {
      const updatedItem = { steps: item.steps + steps, tokens: item.tokens + tokens }
      console.log(updatedItem, 'sjhvbsrjhvb');
      const updated = await HistoryOfSteps.updateOne(query, updatedItem);
      console.log(updated, 'sjhvbsrjhvb');
      return updated;
    }
    if (!item) {
      const newItem = await HistoryOfSteps.create({ userId, date, steps, tokens });
      return newItem;
    }
  }
}

export default new userInfoService();
