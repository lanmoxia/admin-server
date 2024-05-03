const RoleModel = require('../model/RoleModel');

const RoleService = {
  // 获取角色列表
  getRoles: async () => {
    try {
      return await RoleModel.find().populate('permissions');
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // 根据ID获取角色
  getRoleById: async (id) => {
    try {
      return await RoleModel.findById(id).populate('permissions');
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // 创建新角色
  createRole: async (roleData) => {
    try {
      const existingRole = await RoleModel.findOne({ name: roleData.name });
      if (existingRole) {
        throw new Error('角色已存在');
      }
      const role = new RoleModel(roleData);
      return await role.save();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // 更新角色
  updateRole: async (id, roleData) => {
    try {
      return await RoleModel.findByIdAndUpdate(id, roleData, { new: true }).populate('permissions');
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // 删除角色
  deleteRole: async (id) => {
    try {
      return await RoleModel.findByIdAndDelete(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

module.exports = RoleService;