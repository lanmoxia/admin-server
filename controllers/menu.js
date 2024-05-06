// const {User,SmsLogin} = require('../models');
// const jwt = require('jsonwebtoken');
// const { secret } = require('../utils/JWT');
// const { formatResponse } = require('../utils/unifieFormat');
// const MenuService = require('../services/MenuService')

// const PermissionController = {
//   list: async(req,res) => {},
//   create: async(req,res) => {},
//   update: async(req,res) => {},
//   delete: async(req,res) => {},
//   one: async(req,res) => {},
//   // 获取权限列表
//   getPermissions: async (req, res) => {
//     try {
//       const permissions = await MenuService.getPermissions();
//       res.json(formatResponse(permissions, '权限列表获取成功'));
//     } catch (error) {
//       res.status(500).json(formatResponse(null, error.message, false));
//     }
//   },

//   // 创建权限
//   createPermission: async (req, res) => {
//     try {
//       const permissionData = req.body;
//       const permission = await MenuService.createPermission(permissionData);
//       res.status(201).json(formatResponse(permission, '权限创建成功'));
//     } catch (error) {
//       res.status(400).json(formatResponse(null, error.message, false));
//     }
//   }
// };

// module.exports = PermissionController;

exports.list = async(req,res) => {}
exports.create = async(req,res) => {}
exports.update = async(req,res) => {}
exports.delete = async(req,res) => {}
exports.one = async (req,res) => {}