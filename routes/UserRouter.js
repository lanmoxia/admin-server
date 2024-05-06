// var express = require('express')
// var UserRouter = express.Router()
// const userCtrl = require('../controllers/user')
// const captcharCtrl = require('../controllers/captchar')
// const refreshCtrl = require('../controllers/refresh')
// const smsCodeCtrl = require('../controllers/smsCode')
// const smsLoginCtrl = require('../controllers/smsLogin')

// UserRouter
// .get('/users', userCtrl.list)
// .post('/users', userCtrl.create)
// .put('/users/:id', userCtrl.update)
// .delete('/users/:id', userCtrl.delete)
// .get('/users/:id', userCtrl.one)
// .patch('/users/:id/roles',userCtrl.updateRoles) // 用户分配角色


// // UserRouter.post('/users/register', UserController.register)
// // UserRouter.post('/user/login', UserController.login)
// // UserRouter.post('/user/updateAvatar', UserController.useAvatarUpdate)
// // UserRouter.get('/user/getList', UserController.getList)
// // // 获取验证码路由
// // UserRouter.get('/captcha', CaptchaController.getCaptcha)
// // // 刷新 token
// // UserRouter.post('/refresh', RefreshController.getRefreshToken)

// // // 获取短信验证码
// // UserRouter.post('/verify_code', SmsCodeController.getCode)
// // // 手机登录
// // UserRouter.post('/user/mobile_login', SmsLoginController.login)
// module.exports = UserRouter