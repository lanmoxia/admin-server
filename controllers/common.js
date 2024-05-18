const path = require('path')
const fs = require('fs')
const crypto = require('crypto') 
const {formatResponse} = require('../utils/unifieFormat')
const commonSvc = require('../services/common')
const {MobileUser} = require('../models')
const {setAccessToken,setRefreshToken} = require('../utils/JWT')

// 验证码
exports.captchar = async(req,res,next) => {
  try {
    const result = commonSvc.captchar()
    if (result.error) {
      return res.status(500).json(formatResponse(500, "验证码生成失败"));
    }
    // 生成一个随机的code_key
    const code_key = crypto.randomBytes(20).toString('hex')
    req.session.captcha = result.text // 存储验证码文本以便后续验证
    req.session.code_key = code_key// 存储code_key以便后续验证
    res.status(200).json(formatResponse(
      200, 
      "获取成功",
      {
      code: result.text, // 验证码文本
      code_key: code_key // 唯一标识符
      }
    ))
  } catch (error){
    next(error)
  }
}

// 账户密码登录
exports.login = async(req,res,next) => {
  try{
    if (!req.body.captcha_code || !req.session.captcha) {
      req.session.captcha = null
      // 验证码不存在
      return res.status(200).json(formatResponse(10039, '验证码缺失'))
    }
  
    // 转换为统一的大小写进行比较
    const inputCaptcha = req.body.captcha_code.toLowerCase()
    const sessionCaptcha = req.session.captcha.toLowerCase()
  
    // 检查验证码是否匹配
    if (inputCaptcha !== sessionCaptcha) {
      req.session.captcha = null
      // 验证号码过期或错误
      return res.status(200).json(formatResponse(10040, '验证码错误'))
    }
  
    // 处理登录
    const result = await commonSvc.login(req.body)
    if (result.errorMessage) {
      if(result.errorMessage === "UserNotFound"){
        return res.status(401).send(formatResponse(1004, result.errorMessage))
      }else if(result.errorMessage === "PasswordMismatch"){
        return res.status(402).send(formatResponse(1005, result.errorMessage))
      }
    }
    // 成功响应
    const user = result
    const accessToken = setAccessToken({ id: user._id, username: user.username })
    const refreshToken = setRefreshToken({ id: user._id, username: user.username })

      // 避免出现由于同时触发了两个异步登录请求，
      //第一个请求的验证码验证成功了，但是第二个请求的验证码为空，从而导致验证码缺失错误的情况。
     // 在这里清除验证码
     req.session.captcha = null

    res.status(200).json(formatResponse(200, '登录成功', {
      info: {
        id: user._id,
        username: user.username,
        avatar: user.avatar
      },
      accessToken,
      refreshToken
    }))
  } catch (error){
    next(error)
  }
}

// 手机验证码
exports.mobileCode = async(req,res,next) => {
  try{
    const mobile = req.body.mobile
    const result = await commonSvc.mobileCode(mobile)
    if (result.errorMessage) {
      res.status(500).json(formatResponse(500, "生成验证码失败"))
    } else {
      res.status(200).json(formatResponse(200, "获取成功",{code:result}))
    }
  } catch (error){
    next(error)
  }
}

// 手机登录
exports.mobileLogin = async(req,res,next) => {
  try{
    const result = await commonSvc.mobileLogin(req.body)
    if (result.errorMessage) {
      let statusCode = 401;
      let errorMessage = '登录失败';
      switch(result.errorMessage) {
        case 'UserNotFound':
          errorMessage = '用户未找到';
          break;
        case 'CodeMismatch':
          errorMessage = '验证码不匹配';
          break;
        case 'ServerError':
          statusCode = 500; // 服务器错误应该返回500状态码
          errorMessage = '服务器错误';
          console.log('error', result.details); // 记录错误详情
          break;
      }
      res.status(statusCode).send(formatResponse(statusCode, errorMessage))
    } else {
      // 登录成功后，删除验证码
      await MobileUser.updateOne({ _id: result._id }, { sms_code: null })

      const accessToken = setAccessToken({ id: result._id, mobile: result.mobile })
      const refreshToken = setRefreshToken({ id: result._id, mobile: result.mobile })

      res.status(200).send(formatResponse(200, '登录成功', {
        info: {
          id: result._id,
          username: result.mobile,
          avatar: result.avatar
        },
        accessToken,
        refreshToken
      }))
    }
  } catch (error){
    next(error)
  }
}

// 用户权限
exports.permissionList = async(req,res,next) => {
  try{
    const result = await commonSvc.permissionList()
    res.status(200).send(formatResponse(200, '获取成功', result))
  } catch (error){
    next(error)
  }
}

// 刷新token
exports.refreshToken = async(req,res,next) => {
  try{
    const bearerToken = req.headers.pass
    if (!bearerToken) {
      return res.status(400).json(formatResponse(10042, "refreshToken 缺失"))
    }
    const token = bearerToken.split(' ')[1]
    const result = await commonSvc.refreshToken(token)
    res.json(formatResponse(        
      result.code,
      result.message,
      {
        info: {
          accessToken: result.accessToken,
          refreshToken: result.refreshToken
        }
      }
    ))
  } catch (error){
    next(error)
  }
}

// 搜索用户
exports.search = async (req, res, next) => {
  try {
    console.log(req.query)
    const { username, role, status, dateRange, page, limit } = req.query
    const result = await commonSvc.search({ username, role, status, dateRange, page, limit })
    res.status(200).json(formatResponse(200, "搜索成功", result))
  } catch (error) {
    console.log(error)
    next(error)
  }
}

// 文件上传
exports.uploadFile = (req, res, next) => {
  try {
    console.log(req.file)
    const file = req.file
    const fileInfo = commonSvc.uploadFile(file)
    res.status(200).json(formatResponse(200, "上传成功",{file: fileInfo}))
  } catch (error) {
    next(error)
  }
}

// 下载用户模板
exports.userTemplate = (req, res, next) => {
  try {
   const filePath = commonSvc.userTemplate()
   const fullPath = path.join(__dirname, '..', filePath)
   console.log('Sending file from path:', fullPath);

   // 检查文件是否存在
   fs.access(fullPath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error('File does not exist:', fullPath);
        return next(err); // 文件不存在时返回错误
      }

      res.sendFile(fullPath, err => {
        if (err) {
          next(err)
        }
      console.log('File sent successfully:', fullPath);
     })
   })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

