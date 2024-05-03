// RoleRouter.js
var express = require('express');
var RoleRouter = express.Router();
const RoleController = require('../controllers/RoleController');

// 获取角色列表
RoleRouter.get('/list', RoleController.getRoles);

// 获取单个角色
RoleRouter.get('/:id', RoleController.getRoleById);

// 创建新角色
RoleRouter.post('/', RoleController.createRole);

// 更新角色
RoleRouter.put('/:id', RoleController.updateRole);

// 删除角色
RoleRouter.delete('/:id', RoleController.deleteRole);

module.exports = RoleRouter;