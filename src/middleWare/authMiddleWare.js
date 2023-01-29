import tokenService from '../services/token-service';

const authMiddleWare = (req, res, next) => {
  try {
    const autorizationHeader = req.headers.autorization;
    if (!autorizationHeader) {
      throw new Error('autorization error');
    }
    const accessToken = autorizationHeader.split(' ')[1];
    if (!accessToken) {
      throw new Error('autorization error');
    }

    const userData = tokenService.validateAccessToken(accessToken);

    if (!userData) {
      throw new Error('autorization error');
    }

    req.user = userData;
    next();
  } catch (e) {
    throw new Error('autorization error');
  }
};
