const {MobileUser} = require('../models')

  // 获取用户列表
  exports.list = async(page,limit) => {
    try{
      const skip = (page - 1) * limit
      const users = await MobileUser.find().populate('roles').skip(skip).limit(limit)
      const totalItems = await MobileUser.countDocuments()
      return  { users, totalItems, curPage: page, pageSize: limit }
    } catch (error){
      throw error
    }
  },

  // 创建用户
  // exports.create = async(userData) => {
  //   try {
  //     const existingUser = await MobileUser.findOne({ mobile: userData.mobile })
  //     if (existingUser) {
  //      return {statusCode: 20001, errorMessage: 'UserAlreadyExists'}
  //     }
  //     const newUser = new MobileUser(userData)
  //     await newUser.save()
  //     return { user: newUser }
  //   }catch (error){
  //     throw error
  //   }
  // },

  // 更新用户
  exports.update = async(paramsId,formData) => {
    try{
      const user = await MobileUser.findById(paramsId)
      if(user === null) {
        return { statusCode: 404, errorMessage: 'UserNotFound' }
      }
       // 将请求数据合并到数据对象中
      Object.assign(user, formData)
      await user.save()
      return {user}
    } catch(error){
      throw error
    }
  },

  // 删除用户
  exports.delete = async(paramsId) => {
    try{
      const user = await MobileUser.findById(paramsId)
      if(user === null) {
        return { statusCode: 404, errorMessage: 'UserNotFound' }
      }
      await MobileUser.findByIdAndDelete(paramsId)
    } catch(error){
      throw error
    }
  },

  // 获取单个用户
  exports.one = async(paramsId) => {
    try{
      const user = await MobileUser.findById(paramsId)
      if(user === null) {
        return { statusCode: 404, errorMessage: 'UserNotFound' }
      }
      return {user}
    } catch(error){
      throw error
    }
  },

  // 关联角色
  exports.updateRoles = async(paramsId,formData) => {
    try{
      const user = await MobileUser.findById(paramsId)
      if(user === null) {
        return { statusCode: 404, errorMessage: 'UserNotFound' }
      }
      user.roles = formData
      await user.save()
      return {user}
    } catch(error){
      throw error
    }
  }

// 搜索用户
exports.search = async () => {
  try{

  } catch (error) {
    throw error
  }
}