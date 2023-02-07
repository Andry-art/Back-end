import { Schema, model } from 'mongoose';

const HistoryOfSteps = new Schema({
  userId: String,
  date: Date,
  steps: Number,
  tokens: Number,
});

export default model('stephistory', HistoryOfSteps);
