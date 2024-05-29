const {User} = require('../models')
const parseExcelFile = require('../utils/parseExcelFile')
const { getRoleMapping } = require('../utils/roleUtils')
const bcrypt = require('bcrypt')

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
    if (existingUser) throw {errno: "200409", errmsg: "用户已存在"}
    const newUser = new User(userData)
    await newUser.save()
    return { user: newUser }
  }catch (error){
    throw error
  }
}

// 更新用户
exports.update = async(paramsId,formData, filename) => {
  try{
    const user = await User.findById(paramsId)
    if(user === null) throw {errno: "200404", errmsg: "用户不存在"}
    // 如果有文件上传，处理文件路径
    const avatarURL = `${process.env.BASE_URL}/avatars/${filename}`
    user.avatar = avatarURL
    // 手动从formData中提取其他字段并更新用户对象
    for (const [key, value] of Object.entries(formData)) {
      if (key !== 'avatar') { // 确保我们不重复处理文件字段
        user[key] = value
      }
    }
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
    if(user === null) throw {errno: "200404", errmsg: "用户不存在"}

    await User.findByIdAndDelete(paramsId)
  } catch(error){
    throw error
  }
}

// 获取单个用户
exports.one = async(paramsId) => {
  try{
    const user = await User.findById(paramsId).populate('roles')
    if(user === null) throw {errno: "200404", errmsg: "用户不存在"}
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
    if(userWithRoles === null) throw {errno: "200404", errmsg: "用户不存在"}
    return userWithRoles
  } catch (error) {
    throw error
  }
}

// 关联角色
exports.updateRoles = async(paramsId,formData) => {
  try{
    const user = await User.findById(paramsId)
    if(user === null) throw {errno: "200404", errmsg: "用户不存在"}
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

    // 加密密码并转换用户数据
    const transformedUsersData = await Promise.all(usersData.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user['密码'], 10);
      const avatarUrl = 'http://localhost:3000/avatars/user.jpg';
      return {
        username: user['用户名'],
        password: hashedPassword,
        avatar: avatarUrl,
        roles: user['角色'] ? [roleMapping[user['角色']]] : [],
        status: user['状态'] !== undefined ? user['状态'] : 'active'
      };
    }));

    let successCount = 0;
    let failureCount = 0;

    // 使用循环而不是insertMany来逐个检查并插入文档
    for (const user of transformedUsersData) {
      try {
        // 检查用户名是否存在
        const existingUser = await User.findOne({ username: user.username }).exec();
        if (!existingUser) {
          await new User(user).save();
          successCount++;
        } else {
          failureCount++;
        }
      } catch (error) {
        failureCount++;
        // 如果需要，可以添加额外的错误处理逻辑
      }
    }
    return { successCount, failureCount };
  } catch (error) {
    throw error;
  }
}

// // 批量创建用户
// exports.batchCreate = async (filePath) => {
//   try {
//     const roleMapping = await getRoleMapping();
//     const usersData = parseExcelFile(filePath);
//     const userCount = await User.countDocuments();

//     // 加密密码并转换用户数据
//     const transformedUsersData = await Promise.all(usersData.map(async (user, index) => {
//       const hashedPassword = await bcrypt.hash(user['密码'], 10);
//       const avatarUrl = userCount === 0 && index === 0 ? 'http://localhost:3000/avatars/admin.png' : 'http://localhost:3000/avatars/user.jpg';
//       return {
//         username: user['用户名'],
//         password: hashedPassword,
//         avatar: avatarUrl,
//         roles: user['角色'] ? [roleMapping[user['角色']]] : [],
//         status: user['状态'] !== undefined ? user['状态'] : undefined
//       }
//     }))

//     let successCount = 0
//     let failureCount = 0

//     // 使用循环而不是insertMany来逐个插入文档
//     for (const user of transformedUsersData) {
//       try {
//         await new User(user).save()
//         successCount++
//       } catch (error) {
//         failureCount++
//       }
//     }
//     return { successCount, failureCount };
//   } catch (error) {
//     throw error
//   }
// }