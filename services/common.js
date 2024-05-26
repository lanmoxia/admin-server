const {User,MobileUser,Menu,Resource} = require('../models')
const captcha = require('svg-captcha')
const bcrypt = require('bcrypt')
const { setAccessToken, setRefreshToken, secret} = require('../utils/JWT')
const jwt = require('jsonwebtoken')

// 验证码
exports.captchar = () => {
  try {
    // 验证码生成错误测试
    // const shouldFail = true
    // if (shouldFail) {
    //   throw new Error('故意引入的错误');
    // }
    const cap = captcha.create({
      size: 2,
      ignoreChars: '0o1i',
      noise: 2,
      color: true,
      background: '#cc9966'
    })
    if(cap === null) throw {status: 500, errno: '100500', errmsg: '验证码生成失败' }
    return cap
  } catch (error) {
    throw error
  }
}

// 账户密码登录
exports.login = async(formData) => {
  try{
    let user = await User.findOne({ username: formData.username }).select('+password')
    if (user === null) throw { errno: '104401', errmsg: '账号未找到'}
    // 校验密码
    const isMatch = await bcrypt.compare(formData.password, user.password)
    if (!isMatch) throw { errno: '105401', errmsg: '账户或密码错误'}

    // 校验用户状态
    if (user.status === 0) throw {errno: '106401', errmsg: '账户已被禁用'}
    return user
  } catch (error) {
    throw error
  }
}

// 手机验证码
exports.mobileCode = async(mobile) => {
  try{
    let code = Math.floor(100000 + Math.random() * 900000).toString()
    const user = await MobileUser.findOne({ mobile })
    if (user) {
      user.sms_code = code
      user.lastRequestedCodeAt = new Date()
      await user.save()
    } else {
      newUser = new MobileUser({mobile,sms_code:code})
      await newUser.save()
    }
    if(cap === null) throw {status: 500, errno: '101500', errmsg: '验证码生成失败' }
    return code
  } catch (error) {
    throw error
  }
}

// 手机登录
exports.mobileLogin = async(formData) => {
  try{
    const user = await MobileUser.findOne({ mobile: formData.mobile })
    if (!user) throw { errno: '106401', errmsg: '账号未找到'}
    const isMatch = await bcrypt.compare(formData.sms_code, user.sms_code)
    if (!isMatch) throw { errno: '107401', errmsg: '验证码错误'}
    return user
  } catch (error) {
    throw error
  }
}

// 权限列表
exports.permissionList = async() => {
  try{
    // 分别查询菜单和按钮
    const menus = await Menu.find().lean()
    const buttons = await Resource.find().lean()
    // 返回包含 menus 和 buttons 的对象
    return {
      menus,
      buttons
    }
  } catch (error) {
    throw error
  }
}

// 刷新 token
exports.refreshToken = async(token) => {
  try{
    const decoded = await jwt.verify(token, secret)
    if (!decoded || !decoded.id || !decoded.username) {
      throw { errno: "108401", errmsg: "refreshToken 无效" }
    }
    const id = decoded.id
    const username = decoded.username
    const newAccessToken = setAccessToken({ id, username })
    const newRefreshToken = setRefreshToken({ id, username })
    return { 
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    }
  } catch (error) {
    if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError'){
      throw { errno: "108401", errmsg: "refreshToken 无效" }
    }
    throw error
  }
}

// 搜索用户
exports.search = async ({ username, role, status, dateRange, page, limit }) => {
  try {
    const query = {}
    if (username) {
      query.username = new RegExp(username, 'i') 
    }
    if (role) {
      query.roles = role 
    }
    if (status !== undefined) {
      query.status = status
    }
    if (dateRange && dateRange.length === 2) {
      query.createdAt = {
        $gte: new Date(dateRange[0]),
        $lte: new Date(dateRange[1])
      }
    }

    const skip = (page - 1) * limit
    const users = await User.find(query).populate('roles').skip(skip).limit(limit)
    const total_items = await User.countDocuments(query)
    return { users, total_items, curPage: page, pageSize: limit }
  } catch (error) {
    throw error
  }
}


// 文件上传
exports.uploadFile = (file) => {
  try {
    // 返回文件路径
    return {
      filename: file.filename,
      path: `/uploads/${file.filename}`
    }
  } catch (error) {
    throw error
  }
}

// 下载用户模板
exports.userTemplate = () => {
  try {
    const filePath = 'public/uploads/user_template.xls'
    return filePath
  } catch (error) {
    throw error
  }
}
