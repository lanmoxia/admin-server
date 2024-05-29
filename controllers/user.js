const userSvc = require('../services/user')
const {formatResponse} = require('../utils/unifieFormat')

// 获取用户列表
exports.list = async(req,res,next) => {
  try{
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const {users, totalItems, curPage, pageSize } = await userSvc.list(page, limit)
    res.status(200).json(formatResponse(0,"获取成功",{
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
exports.create = async(req,res,next) => {
  try{
    // if (!req.body.captcha_code || !req.session.captcha) {
    //   req.session.captcha = null
    //   // 验证码不存在
    //   return res.status(200).json(formatResponse(10039, '验证码缺失'))
    // }
  
    // // 转换为统一的大小写进行比较
    // const inputCaptcha = req.body.captcha_code.toLowerCase()
    // const sessionCaptcha = req.session.captcha.toLowerCase()
  
    // // 检查验证码是否匹配
    // if (inputCaptcha !== sessionCaptcha) {
    //   req.session.captcha = null
    //   // 验证号码过期或错误
    //   return res.status(200).json(formatResponse(10040, '验证码错误'))
    // }
    
    // 处理注册
   await userSvc.create(req.body)
    // 避免出现由于同时触发了两个异步登录请求，
    // 第一个请求的验证码验证成功了，但是第二个请求的验证码为空，从而导致验证码缺失错误的情况。
    // 在这里清除验证码
    //  req.session.captcha = null

    res.status(200).json(formatResponse(0,"创建成功"))
  } catch (err){
    next(err)
  }
}

// 更新用户
exports.update = async(req,res,next) => {
  try{
    const id = req.params.id
    const formData = req.body
    const filename = req.file ? req.file.filename : null
    const result = await userSvc.update(id,formData,filename)
    res.status(200).json(formatResponse(0,"更新成功",result))
  } catch(error){
    console.log('user_update_error',error)
    next(error) 
  }
}

// 删除用户
exports.delete = async(req,res,next) => {
  try{
    await userSvc.delete(req.params.id)
    res.status(200).json(formatResponse(0,'删除成功'))
  } catch(error){
    next(error) 
  }
}

// 查询单个用户
exports.one = async (req,res,next) => {
  try{
    const result = await userSvc.one(req.params.id)
    res.status(200).json(formatResponse(0,'获取成功',result))
  } catch(error){
    next(error) 
  }
}

// 用户权限
exports.userPermissions = async(req,res,next) => {
  try{
    const result = await userSvc.userPermissions(req.user)
    res.status(200).send(formatResponse(0, '获取成功', result.roles))
  } catch (error){
    next(error)
  }
}

// 关联角色
exports.updateRoles = async (req,res,next) => {
  try{
    const result = await userSvc.updateRoles(req.params.id,req.body.roles)
    res.status(200).json(formatResponse(0,'设置成功',result))
  } catch(error){
    throw error
  }
}

// 批量创建用户
exports.batchCreate = async (req,res,next) => {
  try{
    if (!req.file) throw {errno: "201404", errmsg: "文件不存在"}

    const result = await userSvc.batchCreate(req.file.path)
    // 文件上传到服务器才需要的
    // 清理上传的临时文件
    // fs.unlinkSync(req.file.path)
    res.status(200).json(formatResponse(0,'创建成功',result))
  } catch (error) {
    next(error)
  }
}
