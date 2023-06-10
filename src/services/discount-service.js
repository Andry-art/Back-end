import Discounts from '../models/Discounts.js';
import CodeDiscount from '../models/CodeDiscount.js';
import ApiError from '../exeption/api-error.js';

class discountService {
  async postNewDiscount(data) {
    const discountInDB = await Discounts.findOne({ title: data.title });
    if (discountInDB) {
      throw ApiError.BadRequest('this discount already exist');
    }
  
    const promoCodes = data.promoCodes.split(',');
    console.log(promoCodes);
    const newDiscount = await Discounts.create({
      title: data.title,
      rules: data.rules,
      discount: data.discount,
      cost: data.cost,
      img: data.img,
    });
   
    promoCodes.forEach(async it => {
      await CodeDiscount.create({ discountId: newDiscount._id, code: it });
    });
    return newDiscount;
  }

  async getAllDiscount() {
    const allDiscounts = await Discounts.find();
    return allDiscounts;
  }

  async getDiscountPromoCodes(data) {
    const allDiscountsCodes = await CodeDiscount.find({ discountId: data });

    return allDiscountsCodes;
  }
}

export default new discountService();
