const {User} = require('../models')
const parseExcelFile = require('../utils/parseExcelFile')
const { getRoleMapping } = require('../utils/roleUtils')
const bcrypt = require('bcrypt');

// 获取用户列表
exports.list = async(page,limit) => {
  try{
    const skip = (page - 1) * limit
    const users = await User.find().populate('roles').skip(skip).limit(limit)
    const totalItems = await User.countDocuments()
    return  { users, totalItems, curPage: page, pageSize: limit }
  } catch (error){
    throw error
  }
}

// 创建用户
exports.create = async(userData) => {
  try {
    const existingUser = await User.findOne({ username: userData.username })
    if (existingUser) {
      return {statusCode: 20001, errorMessage: 'UserAlreadyExists'}
    }
    const newUser = new User(userData)
    await newUser.save()
    return { user: newUser }
  }catch (error){
    throw error
  }
}

// 更新用户
exports.update = async(paramsId,formData) => {
  try{
    const user = await User.findById(paramsId)
      // 将请求数据合并到数据对象中
    Object.assign(user, formData)
    await user.save()
    return {user}
  } catch(error){
    throw error
  }
}

// 删除用户
exports.delete = async(paramsId) => {
  try{
    const user = await User.findById(paramsId)
    if(user === null) {
      return { statusCode: 404, errorMessage: 'UserNotFound' }
    }
    await User.findByIdAndDelete(paramsId)
  } catch(error){
    throw error
  }
}

// 获取单个用户
exports.one = async(paramsId) => {
  try{
    const user = await User.findById(paramsId).populate('roles')
    if(user === null) {
      return { statusCode: 404, errorMessage: 'UserNotFound' }
    }
    return {user}
  } catch(error){
    throw error
  }
}

// 用户权限
exports.userPermissions = async(user) => {
  try{
    const populateObj = {
      // 把 roles 的 id 做一个数据映射
      path: 'roles',
      // 继续映射子级
      populate: [
        //把 menus 的 id 做一个数据映射
        { path: 'menus' },
        //把 resources 的 id 做一个数据映射
        { path: 'resources' }
      ]
    }

    let userWithRoles
    if ('username' in user) {
      // 如果 user 中包含 username， 表示是账号登录
      userWithRoles = await User.findById(user._id).populate(populateObj)
    } else if ('mobile' in user) {
      // 如果 user 中包含 mobile，表示是手机登录
      userWithRoles = await MobileUser.findById(user._id).populate(populateObj)
    }
    return userWithRoles
  } catch (error) {
    throw error
  }
}

// 关联角色
exports.updateRoles = async(paramsId,formData) => {
  try{
    const user = await User.findById(paramsId)
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

// 批量创建用户
exports.batchCreate = async (filePath) => {
  try {
    const roleMapping = await getRoleMapping();
    const usersData = parseExcelFile(filePath);
    const userCount = await User.countDocuments();

    // 加密密码并转换用户数据
    const transformedUsersData = await Promise.all(usersData.map(async (user, index) => {
      const hashedPassword = await bcrypt.hash(user['密码'], 10);
      const avatarUrl = userCount === 0 && index === 0 ? 'http://localhost:3000/avatars/admin.png' : 'http://localhost:3000/avatars/user.jpg';
      return {
        username: user['用户名'],
        password: hashedPassword,
        avatar: avatarUrl,
        roles: user['角色'] ? [roleMapping[user['角色']]] : [],
        status: user['状态'] !== undefined ? user['状态'] : undefined
      };
    }));

    let successCount = 0;
    let failureCount = 0;

    // 使用循环而不是insertMany来逐个插入文档
    for (const user of transformedUsersData) {
      try {
        await new User(user).save();
        successCount++;
      } catch (error) {
        failureCount++;
      }
    }
    return { successCount, failureCount };
  } catch (error) {
    throw error
  }
}