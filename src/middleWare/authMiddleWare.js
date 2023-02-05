import ApiError from '../exeption/api-error';
import tokenService from '../services/token-service';

const authMiddleWare = (req, res, next) => {
  try {
    const autorizationHeader = req.headers.autorization;
    if (!autorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = autorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);

    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};

export default authMiddleWare;
