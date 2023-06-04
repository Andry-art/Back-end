import { Schema, model } from 'mongoose';

const CodeDiscount = new Schema({
  discountId: { type: String, required: true },
  code: { type: String, required: true },
});

export default model('codeDiscount', CodeDiscount);
