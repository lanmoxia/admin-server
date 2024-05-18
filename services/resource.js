const {Resource} = require('../models')

// 按钮列表
exports.list = async() => {
  try{
    const resources = await Resource.find()
    return resources
  } catch (error){
    throw error
  }
},

// 创建按钮
exports.create = async(resourceData) => {
  try {
    const existingResources = await Resource.findOne({ name: resourceData.name })
    if (existingResources) {
     return {statusCode: 20001, errorMessage: 'UserAlreadyExists'}
    }
    const newResources = new Resource(resourceData)
    await newResources.save()
    return { resources: newResources }
  }catch (error){
    throw error
  }
},

// 更新按钮
exports.update = async(paramsId,formData) => {
  try{
    const resources = await Resource.findById(paramsId)
     // 将请求数据合并到数据对象中
    Object.assign(resources, formData)
    await resources.save()
    return {menu}
  } catch(error){
    throw error
  }
},

// 删除按钮
exports.delete = async(paramsId) => {
  try{
    const resources = await Resource.findById(paramsId)
    if(resources === null) {
      return { statusCode: 404, errorMessage: 'UserNotFound' }
    }
    await Resource.findByIdAndDelete(paramsId)
  } catch(error){
    throw error
  }
},

// 查询按钮
exports.one = async(paramsId) => {
  try{
    const resources = await Resource.findById(paramsId)
    if(resources === null) {
      return { statusCode: 404, errorMessage: 'UserNotFound' }
    }
    return {menu}
  } catch(error){
    throw error
  }
}