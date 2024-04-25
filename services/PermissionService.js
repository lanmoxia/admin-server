const PermissionModel = require('../model/PermissionModel');

const PermissionService = {
  createPermission: async (permissionData) => {
    try {
      const permission = new PermissionModel(permissionData);
      return await permission.save();
    } catch (error) {
      throw error;
    }
  },
  getPermissions: async (req,res) => {
    try {
      return await PermissionModel.find().populate('children').populate('buttonList');
    } catch (error) {
      console.error('获取权限列表失败:', error);
      throw new Error('数据库查询错误');
    }
  },
  updatePermission: async (permissionId, updateData) => {
    try {
      return await PermissionModel.findByIdAndUpdate(permissionId, updateData, { new: true });
    } catch (error) {
      throw error;
    }
  },
  deletePermission: async (permissionId) => {
    try {
      return await PermissionModel.findByIdAndDelete(permissionId);
    } catch (error) {
      throw error;
    }
  }
};

module.exports = PermissionService;
