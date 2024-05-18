const resourceSvc = require('../services/resource')
const {formatResponse} = require('../utils/unifieFormat')

// 按钮列表
exports.list = async(req,res,next) => {
  try{
    const result = await resourceSvc.list()
    res.status(200).json(formatResponse(200,"获取成功",result))
  } catch (error){
    next(error)
  }
}

// 创建按钮
exports.create = async(req,res,next) => {
  try{
    const result = await resourceSvc.create(req.body)
    if(result.errorMessage){
      if(result.errorMessage === 'UserAlreadyExists'){
        return res.status(404).json(formatResponse(404,'按钮已存在'))
      }
    }
    res.status(200).json(formatResponse(200,"创建成功"))
  } catch (error){
    next(error)
  }
}

// 更新按钮
exports.update = async(req,res,next) => {
  try{
    const result = await resourceSvc.update(req.params.id,req.body)
    res.status(200).json(formatResponse(200,"更新成功",result))
  } catch (error){
    next(error)
  }
}

// 删除按钮
exports.delete = async(req,res,next) => {
  try{
    const result = await resourceSvc.delete(req.params.id)
    if(result.errorMessage){
      if(result.errorMessage === 'UserNotFound'){
        return res.status(404).json(formatResponse(404,'按钮不存在'))
      }
    }
    res.status(200).json(formatResponse(200,'删除成功'))
  } catch (error){
    next(error)
  }
}

// 查询按钮
exports.one = async (req,res,next) => {
  try{
    const result = await resourceSvc.one(req.params.id)
    if(result.errorMessage){
      if(result.errorMessage === 'UserNotFound'){
        return res.status(404).json(formatResponse(404,'按钮不存在'))
      }
    }
    res.status(200).json(formatResponse(200,'获取成功',result))
  } catch (error){
    next(error)
  }
}