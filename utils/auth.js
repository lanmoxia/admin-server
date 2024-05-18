const {User, MobileUser} = require('../models')
const jwt = require('jsonwebtoken');
const { secret } = require('./JWT');
const {formatResponse} = require('../utils/unifieFormat')


// 白名单
const whiteList = ['/login', '/mobile_login','/captcha', '/mobile_code']

// 白名单判断
const isInWhiteList = (url, whiteList) => {
  return whiteList.includes(url)
}

// 函数中间件
const auth = (req, res, next) => {
  let url = req.path;
  if (isInWhiteList(url, whiteList)) {
    return next()
  } else {
    const bearerToken = req.headers["authorization"]
    if (!bearerToken) {
      return res.status(400).json(formatResponse(10044, "accessToken 缺失 "));
    }
    const token = bearerToken.split(' ')[1];
    jwt.verify(token, secret, async (error,decoded) => {
      if (error) {
        return res.status(200).json(formatResponse(10041, "accessToken 无效"));
      } else {
      if ('username' in decoded) { // 包含 username， 表示是账号登录
        req.user = await User.findById(decoded.id)
      } else if ('mobile' in decoded) { // 包含 mobile，表示是手机登录
        req.user = await MobileUser.findById(decoded.id) 
      }
        next()
      }
    })
  }
};

module.exports = auth