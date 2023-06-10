import discountService from '../services/discount-service.js';

class discountControler {
  async createDiscount(req, res, next) {
    try {
      const body = { ...req.body, discount: Number(req.body.discount), cost: Number(req.body.cost) };

      const newDiscount = await discountService.postNewDiscount(body);

      return res.status(200).json(newDiscount);
    } catch (e) {
      next(e);
      // res.status(400).json({ message: 'Registration Error' });
    }
  }

  async getAllDiscounts(req, res, next) {
    try {
      const allDiscounts = await discountService.getAllDiscount();

      return res.status(200).json(allDiscounts);
    } catch (e) {
      next(e);
      // res.status(400).json({ message: 'Registration Error' });
    }
  }

  async getDiscountsPromoCodes(req, res, next) {
    console.log(req.query.id)
    try {
      const allDiscountsPromoCodes = await discountService.getDiscountPromoCodes(req.query.id);

      return res.status(200).json(allDiscountsPromoCodes);
    } catch (e) {
      next(e);
      // res.status(400).json({ message: 'Registration Error' });
    }
  }
}

export default new discountControler();
