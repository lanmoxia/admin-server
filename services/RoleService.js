const RoleModel = require('../model/RoleModel');

const RoleService = {
  // 获取角色列表
  getRoles: async () => {
    try {
      return await RoleModel.find().populate('permissions');
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
};

module.exports = RoleService;
