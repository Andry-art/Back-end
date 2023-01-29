import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import tokenService from './token-service.js';
import userDto from '../dto/user-dto.js';

class userService {
  async signUp(email, password) {
    const candidate = await User.findOne({ email });
    if (candidate) {
      throw new Error('user with this email already exist');
    }
    const hashPassword = bcrypt.hashSync(password, 7);
    const user = await User.create({ email, password: hashPassword });
    const userD = new userDto(user);
    const tokens = tokenService.generateTokens({ ...userD });
    tokenService.saveToken(userD.id, tokens.refreshRoken);
    return {
      ...tokens,
      user: userD,
    };
  }

  async logIn(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('user did not find');
    }
    const isPasswordEqual = bcrypt.compareSync(password, user.password);
    if (!isPasswordEqual) {
      throw new Error('password is wrong');
    }
    const userD = new userDto(user);
    const tokens = tokenService.generateTokens({ ...userD });
    tokenService.saveToken(userD.id, tokens.refreshRoken);
    return {
      ...tokens,
      user: userD,
    };
  }

  async logOut(refreshToken) {
    const token = tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new Error('no refresh token');
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDB) {
      throw new Error('Unautorize user');
    }
    const user = await User.findById(userData.id);
    const userD = new userDto(user);
    const tokens = tokenService.generateTokens({ ...userD });
    tokenService.saveToken(userD.id, tokens.refreshRoken);
    return {
      ...tokens,
      user: userD,
    };
  }
}

export default new userService();
