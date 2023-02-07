import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import tokenService from './token-service.js';
import userDto from '../dto/user-dto.js';
import UserData from '../dto/user-data.js';
import ApiError from '../exeption/api-error.js';

class userInfoService {
  async getDailyInfo(id) {
    const user = await User.findOne({ _id: id });
  
    const userData = new UserData(user);

    return {
      data: userData,
    };
  }
}

export default new userInfoService();
