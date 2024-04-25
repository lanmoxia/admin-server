var express = require('express');
var PermissionRouter = express.Router();
const PermissionController = require('../controllers/PermissionController');

// 权限管理路由
PermissionRouter.get('/list', PermissionController.getPermissions);

module.exports = PermissionRouter;