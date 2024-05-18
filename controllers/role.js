const roleSvc = require('../services/role')
const {formatResponse} = require('../utils/unifieFormat')

// 获取角色列表
exports.list = async(req,res,next) => {
  try{
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const {roles, totalItems, curPage, pageSize } = await roleSvc.list(page, limit)
    res.status(200).json(formatResponse(200,"获取成功",{
      roles,
      page_info: {
        cur_page: curPage.toString(),
        page_size: pageSize.toString(),
        total_items: totalItems.toString()
      }
    }))
  } catch(error){
    next(error) 
  }
}

// 创建角色
exports.create = async(req,res,next) => {
  try{
    const result = await roleSvc.create(req.body)
    if(result){
      if(result.errorMessage === 'RoleAlreadyExists'){
        return res.status(404).json(formatResponse(404,'角色已存在'))
      }
    }
    res.status(200).json(formatResponse(200,"创建成功"))
  } catch(error){
    next(error) 
  }
}

// 更新角色
exports.update = async(req,res,next) => {
  try{
    const result = await roleSvc.update(req.params.id,req.body)
    res.status(200).json(formatResponse(200,"更新成功",result))
  } catch(error){
    next(error) 
  }
}

// 删除角色
exports.delete = async(req,res,next) => {
  try{
    const result = await roleSvc.delete(req.params.id)
    if(result){
      if(result.errorMessage === 'RoleNotFound'){
        return res.status(404).json(formatResponse(404,'用户不存在'))
      }
    }
    res.status(200).json(formatResponse(200,'删除成功'))
  } catch(error){
    next(error) 
  }
}

// 查询角色
exports.one = async (req,res,next) => {
  try{
    const result = await roleSvc.one(req.params.id)
    if(result.errorMessage === 'RoleNotFound'){
      return res.status(404).json(formatResponse(404,'用户不存在'))
    }
    res.status(200).json(formatResponse(200,'获取成功',result))
  } catch(error){
    next(error) 
  }
}

// 分配权限
exports.permissionAssignment = async (req,res,next) => {
  try {
    const result = await roleSvc.permissionAssignment(req.params.id,req.body)
    if(result.errorMessage === 'RoleNotFound'){
      return res.status(404).json(formatResponse(404,'角色不存在'))
    }
    res.status(200).json(formatResponse(200,'设置成功',result))
  } catch(error){
    next(error) 
  }
}

// // 关联菜单
// exports.roleMenuAssociation = async (req,res,next) => {
//   try{
//     console.log(req.params.id,req.body)
//     const result = await roleSvc.roleMenuAssociation(req.params.id,req.body)
//     if(result.errorMessage === 'RoleNotFound'){
//       return res.status(404).json(formatResponse(404,'角色不存在'))
//     }
//     res.status(200).json(formatResponse(200,'设置成功',result))
//   } catch(error){
//     next(error) 
//   }
// }

// // 关联按钮
// exports.roleResourceAssociation = async (req,res,next) => {
//   try{
//     const result = await roleSvc.roleResourceAssociation(req.params.id,req.body)
//     if(result.errorMessage === 'RoleNotFound'){
//       return res.status(404).json(formatResponse(404,'角色不存在'))
//     }
//     res.status(200).json(formatResponse(200,'设置成功',result))
//   } catch(error){
//     next(error) 
//   }
// }