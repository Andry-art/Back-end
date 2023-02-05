import ApiError from '../exeption/api-error.js';

const errorMidleware = (err, req, res, next) => {
  console.log(err);
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: 'unpredicteble error' });
};

export default errorMidleware;
