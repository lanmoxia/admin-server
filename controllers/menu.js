const menuSvc = require('../services/menu')
const {formatResponse} = require('../utils/unifieFormat')
const buildTree = require('../utils/buildTree')

// 菜单列表
exports.list = async(req,res,next) => {
  try{
    let result = await menuSvc.list()
    const menus = buildTree(result)
    res.status(200).json(formatResponse(200,"获取成功",menus))
  } catch (error){
    next(error)
  }
}

// 创建菜单
exports.create = async(req,res,next) => {
  try{
    const result = await menuSvc.create(req.body)
    if(result){
      if(result.errorMessage === 'UserAlreadyExists'){
        return res.status(404).json(formatResponse(404,'菜单已存在'))
      }
    }
    res.status(200).json(formatResponse(200,"创建成功"))
  } catch (error){
    next(error)
  }
}

// 更新菜单
exports.update = async(req,res,next) => {
  try{
    const result = await menuSvc.update(req.params.id,req.body)
    res.status(200).json(formatResponse(200,"更新成功",result))
  } catch (error){
    next(error)
  }
}

// 删除菜单
exports.delete = async(req,res,next) => {
  try{
    const result = await menuSvc.delete(req.params.id)
    if(result){
      if(result.errorMessage === 'UserNotFound'){
        return res.status(404).json(formatResponse(404,'用户不存在'))
      }
    }
    res.status(200).json(formatResponse(200,'删除成功'))
  } catch (error){
    next(error)
  }
}

// 查询菜单
exports.one = async (req,res,next) => {
  try{
    const result = await menuSvc.one(req.params.id)
    if(result){
      if(result.errorMessage === 'UserNotFound'){
        return res.status(404).json(formatResponse(404,'用户不存在'))
      }
    }
    res.status(200).json(formatResponse(200,'获取成功',result))
  } catch (error){
    next(error)
  }
}