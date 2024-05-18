const mongoose = require('mongoose')

module.exports = {
  User: mongoose.model('User', require('./user')),
  Role: mongoose.model('Role', require('./role')),
  Menu: mongoose.model('Menu', require('./menu')),
  Resource: mongoose.model('Resource', require('./resource')),
  Captcha: mongoose.model('Captcha', require('./captcha')),
  Icon: mongoose.model('Icon', require('./icon')),
  MobileUser: mongoose.model('MobileUser', require('./mobileUser'))
  // TODO 后续扩展
  // Code: mongoose.model('Code', require('./smsCode'))
}