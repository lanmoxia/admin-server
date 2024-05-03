const RoleService = require('../services/RoleService');
const { formatResponse } = require('../utils/unifieFormat')

const RoleController = {
  // 获取角色列表
  getRoles: async (req, res) => {
    try {
      const roles = await RoleService.getRoles();
      res.status(200).json(formatResponse(200, '获取成功', roles));
    } catch (error) {
      res.status(500).json(formatResponse(500, '服务器错误', error.message));
    }
  },

  // 根据ID获取角色
  getRoleById: async (req, res) => {
    try {
      const role = await RoleService.getRoleById(req.params.id);
      if (role) {
        res.status(200).json(formatResponse(200, '获取成功', role));
      } else {
        res.status(404).json(formatResponse(404, '角色不存在'));
      }
    } catch (error) {
      res.status(500).json(formatResponse(500, '服务器错误', error.message));
    }
  },

  // 创建新角色
  createRole: async (req, res) => {
    try {
      const newRole = await RoleService.createRole(req.body);
      res.status(201).json(formatResponse(201, '创建成功', newRole));
    } catch (error) {
      if (error.message === '角色已存在') {
        res.status(400).json(formatResponse(400, error.message));
      } else {
        res.status(500).json(formatResponse(500, '服务器错误', error.message));
      }
    }
  },

  // 更新角色
  updateRole: async (req, res) => {
    try {
      const updatedRole = await RoleService.updateRole(req.params.id, req.body);
      if (updatedRole) {
        res.status(200).json(formatResponse(200, '更新成功', updatedRole));
      } else {
        res.status(404).json(formatResponse(404, '角色不存在'));
      }
    } catch (error) {
      res.status(500).json(formatResponse(500, '服务器错误', error.message));
    }
  },

  // 删除角色
  deleteRole: async (req, res) => {
    try {
      await RoleService.deleteRole(req.params.id);
      res.status(200).json(formatResponse(200, '删除成功'));
    } catch (error) {
      res.status(500).json(formatResponse(500, '服务器错误', error.message));
    }
  }
};

module.exports = RoleController;