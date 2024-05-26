const jwt = require('jsonwebtoken')
const secret = 'lanmoxia'

const setAccessToken = (payload = {},expiresIn = '4h') =>{
  return jwt.sign(payload, secret, {expiresIn})
}

const setRefreshToken = (payload = {}, expiresIn = '7d') => {
  return jwt.sign(payload, secret, {expiresIn})
}

// 验证 token
// const token = setAccessToken({ name: '1' });
// setTimeout(() => {
//   try {
//     // 如果token有效，verify方法将返回解码后的token
//     const decoded = jwt.verify(token, secret);
//     console.log('Token is valid:', decoded);
//   } catch (error) {
//     // 如果token无效或过期，将捕获到错误
//     console.log('Token is invalid:', error.message);
//   }
// }, 15000);

module.exports = {
  secret,
  setAccessToken,
  setRefreshToken
}