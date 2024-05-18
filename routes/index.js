const express = require('express')
const Router = express.Router()

const upload = require('../utils/multer')

const userCtrl = require('../controllers/user')
const mobileUserCtrl = require('../controllers/mobileUser')
const roleCtrl = require('../controllers/role')
const menuCtrl = require('../controllers/menu')
const commonCtrl = require('../controllers/common')
const resourceCtrl = require('../controllers/resource')

/**
 * 公共接口
 */

// 账户登录
Router
  .post('/login', commonCtrl.login)
  .get('/captcha',commonCtrl.captchar)

// 手机登录
Router
  .post('/mobile_login', commonCtrl.mobileLogin)
  .post('/mobile_code',commonCtrl.mobileCode)

// 其他接口
Router
  .get('/refresh',commonCtrl.refreshToken)
  .get('/permissions', commonCtrl.permissionList) 
  .get('/users/search', commonCtrl.search)
  .post('/users/upload',upload.single('file'),commonCtrl.uploadFile)
  .get('/down/user_template',commonCtrl.userTemplate)

/**
 * 权限接口
 */

// 账户用户管理路由
Router
  .get('/users', userCtrl.list)
  .post('/users_create', upload.single('file'),userCtrl.batchCreate)
  .get('/users/permission', userCtrl.userPermissions)
  .post('/users', userCtrl.create)
  .put('/users/:id', userCtrl.update)
  .delete('/users/:id', userCtrl.delete)
  .get('/users/:id', userCtrl.one)
  .patch('/users/:id/roles',userCtrl.updateRoles) // 用户分配角色

// 手机用户管理路由
Router
  .get('/mobile_users', mobileUserCtrl.list)
  .put('/mobile_users/:id', mobileUserCtrl.update)
  .delete('/mobile_users/:id', mobileUserCtrl.delete)
  .get('/mobile_users/:id', mobileUserCtrl.one)
  .patch('/mobile_users/:id/roles',mobileUserCtrl.updateRoles) // 用户分配角色

// 角色管理路由
Router
  .get('/roles', roleCtrl.list)
  .post('/roles', roleCtrl.create)
  .put('/roles/:id', roleCtrl.update)
  .delete('/roles/:id', roleCtrl.delete)
  .get('/roles/:id', roleCtrl.one)
  .patch('/roles/:id/permissions',roleCtrl.permissionAssignment) // 分配菜单权限

  // .patch('/roles/:id/menus',roleCtrl.roleMenuAssociation) // 分配菜单权限
  // .patch('/roles/:id/resources',roleCtrl.roleResourceAssociation) // 分配按钮权限

// 权限管理路由
Router
  .get('/menus', menuCtrl.list)
  .post('/menus', menuCtrl.create)
  .put('/menus/:id', menuCtrl.update)
  .delete('/menus/:id', menuCtrl.delete)
  .get('/menus/:id', menuCtrl.one)

// 按钮管理路由
Router
  .get('/resources', resourceCtrl.list)
  .post('/resources', resourceCtrl.create)
  .put('/resources/:id', resourceCtrl.update)
  .delete('/resources/:id', resourceCtrl.delete)
  .get('/resources/:id', resourceCtrl.one)

module.exports = Router