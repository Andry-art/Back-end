import discountService from '../services/discount-service.js';

class discountControler {
  async createDiscount(req, res, next) {
    try {
      const body = { ...req.body, discount: Number(req.body.discount), cost: Number(req.body.cost) };

      const newDiscount = await discountService.postNewDiscount(body);

      // return res.status(200).json(newDiscount);
    } catch (e) {
      next(e);
      // res.status(400).json({ message: 'Registration Error' });
    }
  }
}

export default new discountControler();
