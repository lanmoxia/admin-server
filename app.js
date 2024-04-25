var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var logger = require('morgan');
var session = require('express-session');
const UserRouter = require('./routes/UserRouter')
const RoleRouter = require('./routes/RoleRouter')
const PermissionRouter = require('./routes/PermissionRouter')
const runAvatarCleanup = require('./utils/avatarCleanup');
const cors = require('cors');
const auth = require('./utils/auth'); 
var app = express();


// 允许所有来源的跨域请求
app.use(cors({ origin: '*'}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))

// 身份验证中间件
app.use(auth);

// 关于验证码的中间件
app.use(session({
  secret: 'your_secret_key', // 用来对session id相关的cookie进行签名
  saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
  resave: false, // 是否每次都重新保存会话，建议false
  cookie: {
    maxAge: 1000 * 60 * 10 // 设置返回的cookie时效为10分钟，这里单位是毫秒
  }
}))

// 角色路由
app.use('/role', RoleRouter)

// 权限路由
app.use('/permission', PermissionRouter)

// API路由
app.use(UserRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (req.originalUrl.startsWith('/api/')) {
    // return JSON response for API calls
    res.status(err.status || 500).json({
      code: err.code || 'UNEXPECTED_ERROR',
      message: err.message || 'An unexpected error occurred'
    });
  } else {
    res.status(err.status || 500);
    res.render('error');
  }
});

runAvatarCleanup();

module.exports = app;