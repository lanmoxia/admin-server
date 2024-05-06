// // RoleRouter.js
// var express = require('express');
// var RoleRouter = express.Router();
// const roleCtrl = require('../controllers/role');
// // 角色管理路由
// RoleRouter.get('/roles', roleCtrl.list)
//   .post('/roles', roleCtrl.create)
//   .put('/roles/:id', roleCtrl.update)
//   .delete('/roles/:id', roleCtrl.delete)
//   .get('/roles/:id', roleCtrl.one)
//   .patch('/roles/:id/menus',roleCtrl.updateMenus) // 用户分配权限
//   .patch('/roles/:id/resources',roleCtrl.updateResources) // 用户分配按钮

// module.exports = RoleRouter;