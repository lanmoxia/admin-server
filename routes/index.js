const express = require('express')
const Router = express.Router()

const userCtrl = require('../controllers/user')
const roleCtrl = require('../controllers/role')
const menuCtrl = require('../controllers/menu')
const commonCtrl = require('../controllers/common')
const resourceCtrl = require('../controllers/resources')

/**
 * 公共接口
 */

// 用户登录
Router
  .post('/login', commonCtrl.login)
  .post('/mobile_login', commonCtrl.mobileLogin)
  .get('/permissions', commonCtrl.permissions)
  .get('/captcha',commonCtrl.captchar)
  .get('/refresh',commonCtrl.refreshToken)
  .get('/verify_code',commonCtrl.verifyCode)

/**
 * 权限接口
 */

// 用户管理路由
Router.get('/users', userCtrl.list)
  .post('/users', userCtrl.create)
  .put('/users/:id', userCtrl.update)
  .delete('/users/:id', userCtrl.delete)
  .get('/users/:id', userCtrl.one)
  .patch('/users/:id/roles',userCtrl.updateRoles) // 用户分配角色


// 角色管理路由
Router.get('/roles', roleCtrl.list)
  .post('/roles', roleCtrl.create)
  .put('/roles/:id', roleCtrl.update)
  .delete('/roles/:id', roleCtrl.delete)
  .get('/roles/:id', roleCtrl.one)
  .patch('/roles/:id/menus',roleCtrl.updateMenus) // 分配菜单权限
  .patch('/roles/:id/resources',roleCtrl.updateResources) // 分配按钮权限

// 权限管理路由
Router.get('/menus', menuCtrl.list)
  .post('/menus', menuCtrl.create)
  .put('/menus/:id', menuCtrl.update)
  .delete('/menus/:id', menuCtrl.delete)
  .get('/menus/:id', menuCtrl.one)

// 按钮管理路由
Router.get('/resources', resourceCtrl.list)
  .post('/resources', resourceCtrl.create)
  .put('/resources/:id', resourceCtrl.update)
  .delete('/resources/:id', resourceCtrl.delete)
  .get('/resources/:id', resourceCtrl.one)

module.exports = Router