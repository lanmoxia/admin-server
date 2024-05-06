const {Role} = require('../models')

const RoleService = {
  list: async(req,res) => {},
  create: async(req,res) => {},
  update: async(req,res) => {},
  delete: async(req,res) => {},
  one: async(req,res) => {},
  updateMenus: async(req,res) => {},
  updateResources: async(req,res) => {},
  // 获取角色列表
  getRoles: async () => {
    try {
      return await Role.find().populate('permissions');
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // 根据ID获取角色
  getRoleById: async (id) => {
    try {
      return await Role.findById(id).populate('permissions');
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // 创建新角色
  createRole: async (roleData) => {
    try {
      const existingRole = await Role.findOne({ name: roleData.name });
      if (existingRole) {
        throw new Error('角色已存在');
      }

      // 创建新角色并关联权限ID
      const role = new Role({
        name: roleData.name,
        permissions: roleData.permissions // 这里应该包含权限ID数组
      });

      // 保存角色
      return await role.save();
    } catch (error) {
      console.error(error);
      throw error;
    }
    // try {
    //   const existingRole = await Role.findOne({ name: roleData.name });
    //   if (existingRole) {
    //     throw new Error('角色已存在');
    //   }
    //   const role = new Role(roleData);
    //   return await role.save();
    // } catch (error) {
    //   console.error(error);
    //   throw error;
    // }
  },

  // 更新角色
  updateRole: async (id, roleData) => {
    try {
      return await Role.findByIdAndUpdate(id, roleData, { new: true }).populate('permissions');
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // 删除角色
  deleteRole: async (id) => {
    try {
      return await Role.findByIdAndDelete(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

module.exports = RoleService;