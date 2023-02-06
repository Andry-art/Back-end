class UserData {
  id;
  balance;
  dailySteps;
  dailyActiveType;
  dailyDestenation;
  dailyBalance;
  stepsHistory;
  constructor(model) {
    this.id = model._id;
    this.balance = model.balance;
    this.dailySteps = model.dailySteps;
    this.dailyActiveType = model.dailyActiveType;
    this.dailyDestenation = model.dailyDestenation;
    this.dailyBalance = model.dailyBalance;
    this.stepsHistory = model.stepsHistory;
  }
}
  
export default UserData;
