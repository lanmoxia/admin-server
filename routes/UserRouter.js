var express = require('express')
var UserRouter = express.Router()
const UserController = require('../controllers/UserController')
const CaptchaController = require('../controllers/CaptchaController')
const RefreshController = require('../controllers/RefreshController')
const SmsCodeController = require('../controllers/SmsCodeController')
const SmsLoginController = require('../controllers/SmsLoginController')

UserRouter.post('/user/register', UserController.register)
UserRouter.post('/user/login', UserController.login)
UserRouter.post('/user/updateAvatar', UserController.useAvatarUpdate)
UserRouter.get('/user/getList', UserController.getList)
// 获取验证码路由
UserRouter.get('/captcha', CaptchaController.getCaptcha)
// 刷新 token
UserRouter.post('/refresh', RefreshController.getRefreshToken)
// 获取公钥
UserRouter.get('/publickey', UserController.getPublicKey)
// 获取短信验证码
UserRouter.post('/verify_code', SmsCodeController.getCode)
// 手机登录
UserRouter.post('/user/mobile_login', SmsLoginController.login);
module.exports = UserRouter