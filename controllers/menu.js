const menuSvc = require('../services/menu')
const {formatResponse} = require('../utils/unifieFormat')
const buildTree = require('../utils/buildTree')

// 菜单列表
exports.list = async(req,res,next) => {
  try{
    let result = await menuSvc.list()
    const menus = buildTree(result)
    res.status(200).json(formatResponse(0,"获取成功",menus))
  } catch (error){
    next(error)
  }
}

// 创建菜单
exports.create = async(req,res,next) => {
  try{
    await menuSvc.create(req.body)
    res.status(200).json(formatResponse(0,"创建成功"))
  } catch (error){
    next(error)
  }
}

// 更新菜单
exports.update = async(req,res,next) => {
  try{
    const result = await menuSvc.update(req.params.id,req.body)
    res.status(200).json(formatResponse(0,"更新成功",result))
  } catch (error){
    next(error)
  }
}

// 删除菜单
exports.delete = async(req,res,next) => {
  try{
    await menuSvc.delete(req.params.id)
    res.status(200).json(formatResponse(0,'删除成功'))
  } catch (error){
    next(error)
  }
}

// 查询菜单
exports.one = async (req,res,next) => {
  try{
    const result = await menuSvc.one(req.params.id)
    res.status(200).json(formatResponse(0,'获取成功',result))
  } catch (error){
    next(error)
  }
}