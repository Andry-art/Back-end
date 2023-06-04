import { Schema, model } from 'mongoose';

const Discounts = new Schema({
  title: { type: String, required: true },
  img: { type: String, required: false },
  rules: { type: String, required: true },
  discount: { type: Number, required: true },
  cost: { type: Number, required: true },
});

export default model('discounts', Discounts);
