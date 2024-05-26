const {Menu} = require('../models')

// 菜单列表
exports.list = async(page,limit) => {
  try{
    // .lean() 转为普通JS对象
    const menus = await Menu.find().lean()
    return menus
  } catch (error){
    throw  error
  }
},

// 创建菜单
exports.create = async(userData) => {
  try {
    const existingUser = await Menu.findOne({ name: userData.name })
    if (existingUser) throw { errno: '500409', errmsg: '菜单已存在'}   
    const newMenu = new Menu(userData)
    await newMenu.save()
    return { menu: newMenu }
  }catch (error){
    throw error
  }
},

// 更新菜单
exports.update = async(paramsId,formData) => {
  try{
    const menu = await Menu.findById(paramsId)
    if (menu === null) throw { errno: '500404', errmsg: '菜单不存在'}   
     // 将请求数据合并到数据对象中
    Object.assign(menu, formData)
    await menu.save()
    return {menu}
  } catch(error){
    throw error
  }
},

// 删除菜单
exports.delete = async(paramsId) => {
  try{
    const menu = await Menu.findById(paramsId)
    if (menu === null) throw { errno: '500404', errmsg: '菜单不存在'}   
    await Menu.findByIdAndDelete(paramsId)
  } catch(error){
    throw error
  }
},

// 查询菜单
exports.one = async(paramsId) => {
  try{
    const menu = await Menu.findById(paramsId)
    if (menu === null) throw { errno: '500404', errmsg: '菜单不存在'}   
    return {menu}
  } catch(error){
    throw error
  }
}