const mobileUserSvc = require('../services/mobileUser')
const {formatResponse} = require('../utils/unifieFormat')

// 获取用户列表
exports.list = async(req,res,next) => {
  try{
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const {users, totalItems, curPage, pageSize} = await mobileUserSvc.list(page,limit)
    res.status(200).json(formatResponse(200,"获取成功",{
      users,
      page_info: {
        cur_page: curPage.toString(),
        page_size: pageSize.toString(),
        total_items: totalItems.toString()
      }
    }))
  } catch (error){
    next(error)
  }
}

// 创建用户
// exports.create = async(req,res,next) => {
//   try{
//     // 处理注册
//     const result = await mobileUserSvc.create(req.body)
//     if(result){
//       if(result.errorMessage === 'UserAlreadyExists'){
//         return res.status(404).json(formatResponse(404,'用户已存在'))
//       }
//     }
//     res.status(200).json(formatResponse(200,"创建成功"))
//   } catch (err){
//     next(err)
//   }
// }

// 更新用户
exports.update = async(req,res,next) => {
  try{
    const result = await mobileUserSvc.update(req.params.id,req.body)
    res.status(200).json(formatResponse(200,"更新成功",result))
  } catch(error){
    next(error) 
  }
}

// 删除用户
exports.delete = async(req,res,next) => {
  try{
    const result = await mobileUserSvc.delete(req.params.id)
    if(result){
      if(result.errorMessage === 'UserNotFound'){
        return res.status(404).json(formatResponse(404,'用户不存在'))
      }
    }
    res.status(200).json(formatResponse(200,'删除成功'))
  } catch(error){
    next(error) 
  }
}

// 查询单个用户
exports.one = async (req,res,next) => {
  try{
    const result = await mobileUserSvc.one(req.params.id)
    if(result){
      if(result.errorMessage === 'UserNotFound'){
        return res.status(404).json(formatResponse(404,'用户不存在'))
      }
    }
    res.status(200).json(formatResponse(200,'获取成功',result))
  } catch(error){
    next(error) 
  }
}

// 关联角色
exports.updateRoles = async (req,res,next) => {
  try{
    const result = await mobileUserSvc.updateRoles(req.params.id,req.body.roles)
    if(result){
      if(result.errorMessage === 'UserNotFound'){
        return res.status(404).json(formatResponse(404,'用户不存在'))
      }
    }
    res.status(200).json(formatResponse(200,'设置成功',result))
  } catch(error){
    throw error
  }
}

// 搜索用户
exports.search = async (req,res,next) => {
  try{
    res.send("ok")
  } catch (error) {
    next(error)
  }
}