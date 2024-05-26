const resourceSvc = require('../services/resource')
const {formatResponse} = require('../utils/unifieFormat')

// 按钮列表
exports.list = async(req,res,next) => {
  try{
    const result = await resourceSvc.list()
    res.status(200).json(formatResponse(0,"获取成功",result))
  } catch (error){
    next(error)
  }
}

// 创建按钮
exports.create = async(req,res,next) => {
  try{
    await resourceSvc.create(req.body)
    res.status(200).json(formatResponse(0,"创建成功"))
  } catch (error){
    next(error)
  }
}

// 更新按钮
exports.update = async(req,res,next) => {
  try{
    const result = await resourceSvc.update(req.params.id,req.body)
    res.status(200).json(formatResponse(0,"更新成功",result))
  } catch (error){
    next(error)
  }
}

// 删除按钮
exports.delete = async(req,res,next) => {
  try{
    await resourceSvc.delete(req.params.id)
    res.status(200).json(formatResponse(0,'删除成功'))
  } catch (error){
    next(error)
  }
}

// 查询按钮
exports.one = async (req,res,next) => {
  try{
    const result = await resourceSvc.one(req.params.id)
    res.status(200).json(formatResponse(0,'获取成功',result))
  } catch (error){
    next(error)
  }
}