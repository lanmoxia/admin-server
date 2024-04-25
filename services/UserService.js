const UserModel = require('../model/UserModel')
const bcrypt = require('bcrypt')
require('dotenv').config();
const baseUrl = process.env.BASE_URL
const UserService = {
  // 注册函数
   register: async({ username, password}) => {
    try {
      const existingUser = await UserModel.findOne({ username })
      if (existingUser) {
       return {error: 'UserAlreadyExists'}
      }
      const newUser = new UserModel({username,password})
      await newUser.save()
      return {user:newUser}
    }catch (error){
      return { error: 'ServerError', details: error };  
    }
  },
  // 登录函数
  login: async({ username, password}) => {
    try {
      // 账号不存在
      let user = await UserModel.findOne({ username })
      if (!user) {
        return { error: 'UserNotFound' };
      }
      // 校验密码
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return { error: 'PasswordMismatch' };
      }
      return user
    } catch (error) {
      return { error: 'ServerError', details: error.message };
    }
  },
  // 更新用户
  useAvatarUpdate: async (id,filename) => {
    try {
      // 构建头像的HTTP URL
      const avatarURL = `${baseUrl}/avatars/${filename}`;
      // 构建更新对象，只更新头像URL字段
      const update = { avatar: avatarURL };
      const user = await UserModel.findByIdAndUpdate(id, update, { new: true });
      if (!user) {
        return {error: 'UserNotFound'}
      }
      return user; // 返回更新后的用户对象
    } catch (error) {
      return { error: 'ServerError', details: error.message };
    }
  }
}

module.exports = UserService