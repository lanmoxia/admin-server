// RoleRouter.js
var express = require('express')
var RoleRouter = express.Router()
const RoleController = require('../controllers/RoleController')

// 角色管理路由
RoleRouter.get('/list', RoleController.getRoles)
module.exports = RoleRouter
