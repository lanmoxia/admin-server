const Permission = require('../model/PermissionModel');
const permissionsData = require('../data/permissionsData');
const Icon = require('../model/IconModel');

const seedPermissions = async () => {
  try {
    // 清空数据库 方便测试
    //return await Permission.deleteMany({})

     // 查找所有图标并创建映射
     const icons = await Icon.find({});
     const iconMap = icons.reduce((map, icon) => {
       map[icon.name] = icon.data; // 使用图标的SVG数据
       return map;
     }, {});
 
     // 递归替换权限数据种子中的图标数据
     const replaceIcons = (permissions) => {
       permissions.forEach(permission => {
         if (permission.meta && permission.meta.icon && iconMap[permission.meta.icon]) {
           permission.meta.icon = iconMap[permission.meta.icon]; // 替换为SVG内容
         }
         if (permission.children) {
           replaceIcons(permission.children); // 递归替换子权限的图标
         }
       });
     };
 
    replaceIcons(permissionsData);

    // 检查数据库中是否已有数据
    const count = await Permission.countDocuments();
    if (count === 0) {
      // 如果没有数据，则填充权限数据
      await Permission.insertMany(permissionsData);
    } else {
      // 如果已有数据，则跳过填充
      console.log('数据库中已存在权限数据，跳过填充');
    }
  } catch (error) {
    console.error('填充权限数据过程中出现错误:', error);
  }
};

module.exports = seedPermissions;