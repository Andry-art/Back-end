import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, unique: true, required: true },
  balance: { type: Number, required: true, default: 0 },
  dailySteps: { type: Number, required: true, default: 0 },
  dailyActiveTime: { type: Number, required: true, default: 0 },
  dailyDestenation: { type: Number, required: true, default: 0 },
  dailyBalance: { type: Number, required: true, default: 0 },
  stepsHistory: [
    {
      date: Date,
      steps: Number,
      tokens: Number,
    },
  ],
});

export default model('User', UserSchema);
