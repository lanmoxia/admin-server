const {Menu} = require('../models')

const MenuService = {
  list: async(req,res) => {},
  create: async(req,res) => {},
  update: async(req,res) => {},
  delete: async(req,res) => {},
  one: async(req,res) => {},
   // 获取权限列表
   getPermissions: async () => {
    try {
      return await Menu.find({});
    } catch (error) {
      console.error('获取权限列表失败:', error);
      throw error;
    }
  },

  // 创建权限
  createPermission: async (permissionData) => {
    try {
      const existingPermission = await Menu.findOne({ name: permissionData.name });
      if (existingPermission) {
        throw new Error('权限已存在');
      }
      const permission = new Menu(permissionData);
      return await permission.save();
    } catch (error) {
      console.error('创建权限失败:', error);
      throw error;
    }
  }
}

module.exports = MenuService;
