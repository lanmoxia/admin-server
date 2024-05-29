require('dotenv').config()


var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var session = require('express-session')
const Router = require('./routes')
const handleErrors = require('./utils/errorHandler'); 
const runAvatarCleanup = require('./utils/avatarCleanup')
const cors = require('cors')
const auth = require('./utils/auth')
var app = express()

var corsOptions = {
  origin: 'https://lanmoxia.github.io', // 您的GitHub Pages域名
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的HTTP方法
  allowedHeaders: 'Content-Type,Authorization', // 允许的HTTP头部
  credentials: true, // 是否允许发送Cookie
  optionsSuccessStatus: 200 // 对于一些老旧浏览器的OPTIONS请求响应成功状态码
}
// 允许所有来源的跨域请求
app.use(cors(corsOptions))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

// 身份验证中间件
app.use('/api',auth)

// 关于验证码的中间件
app.use(session({
  secret: 'admin_server_key', // 用来对session id相关的cookie进行签名
  saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
  resave: false, // 是否每次都重新保存会话，建议false
  cookie: {
    maxAge: 1000 * 60 * 10 // 设置返回的cookie时效为10分钟，这里单位是毫秒
  }
}))

app.use(express.static(path.join(__dirname, 'public')))

// API路由
app.use('/api',Router)

// 错误处理中间件
app.use(handleErrors)

// 定时清理头像
runAvatarCleanup()

module.exports = app