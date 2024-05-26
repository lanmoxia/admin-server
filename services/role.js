const {Role} = require('../models')
  
// 获取角色列表
exports.list = async(page,limit) => {
  try{
    const skip = (page - 1) * limit
    // .populate() 将 id 映射为数据
    const roles = await Role.find().populate('menus').populate('resources').skip(skip).limit(limit)
    const totalItems = await Role.countDocuments()
    return  { roles, totalItems, curPage: page, pageSize: limit }
  } catch (error){
    throw error
  }
},
// 创建角色
exports.create = async(userData) => {
  try {
    const existingRole = await Role.findOne({ name: userData.name })
    if(existingRole === null) throw {errno: "300409", errmsg: "角色已存在"}
    const newRole = new Role(userData)
    await newRole.save()
    return { role: newRole }
  }catch (error){
    throw error
  }
},

// 更新角色
exports.update = async(paramsId,formData) => {
  try{
    const role = await Role.findById(paramsId)
    if(role === null) throw {errno: "300404", errmsg: "角色不存在"}
      // 将请求数据合并到数据对象中
    Object.assign(role, formData)
    await role.save()
    return role
  } catch(error){
    throw error
  }
},

// 删除角色
exports.delete = async(paramsId) => {
  try{
    const role = await Role.findById(paramsId)
    if(role === null) throw {errno: "300404", errmsg: "角色不存在"}
    await Role.findByIdAndDelete(paramsId)
  } catch(error){
    throw error
  }
},

// 获取角色
exports.one = async(paramsId) => {
  try{
    const role = await Role.findById(paramsId).populate('menus').populate('resources')
    if(role === null) throw {errno: "300404", errmsg: "角色不存在"}
    return role
  } catch(error){
    throw error
  }
},

// 分配权限
exports.permissionAssignment = async (paramsId, formData) => {
  try {
    const roles = await Role.findById(paramsId)
    if(role === null) throw {errno: "300404", errmsg: "角色不存在"}
    // 更新菜单和按钮
    roles.menus = formData.menus
    roles.resources = formData.resources
    await roles.save()
    return roles
  } catch (error) {
    throw error
  }
}


// // 关联菜单
// exports.roleMenuAssociation = async(paramsId,formData) => {
//   try{
//     const role = await Role.findById(paramsId)
//     if(role === null) {
//       return { statusCode: 404, errorMessage: 'RoleNotFound' }
//     }
//     role.menus = formData.menus
//     await role.save()
//     return role
//   } catch(error){
//     throw error
//   }
// }

// // 关联按钮
// exports.roleResourceAssociation = async (paramsId,formData) => {
//   try{
//     const role = await Role.findById(paramsId)
//     if(role === null) {
//       return { statusCode: 404, errorMessage: 'RoleNotFound' }
//     }
//     role.resources = formData.resources
//     await role.save()
//     return role
//   } catch(error){
//     throw error
//   }
// }