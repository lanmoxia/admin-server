const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
  /**
   * 菜单名称
   */
  name: {
    type: String,
    required: true
  },
  /**
   * 菜单描述
   */
  description: {
    type: String,
    default: ''
  },
  /**
   * 上级菜单
   */
  parentId: {
    type: Schema.Types.ObjectId
  },
  /**
   * 前端名称
   */
  unique: {
    type: String,
    unique: true,
    required: true
  },
  /**
   * 菜单图标
   */
  icon: {
    type: String,
    default: ''
  },
  /**
   * 是否显示
   */
  hidden: {
    type: Boolean,
    default: true
  },
  /**
 * 状态
 * 0： 未启用
 * 1：启用
 */
  status: {
    type: Number,
    default: 1
  },
  /**
   * 排序
   */
  sort: {
    type: Number,
    default: 0
  },
  /**
   * 创建时间
   */
  createdAt: {
    type: Date,
    default: Date.now
  },
  /**
   * 更新时间
   */
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// 在保存文档前替换icon
MenuSchema.pre('save', async function(next) {
  // 在这里，`this` 是您要保存的菜单文档
  try {
    //查找Icon记录
    const iconRecord = await mongoose.model('Icon').findOne({name: this.icon})

    // 替换icon字段
    if (iconRecord) {
      // 去除 XML声明和 DOCTYPE 声明
      const cleanedIconPath = iconRecord.path.replace(/<\?xml.*?\?>|<!DOCTYPE.*?>/g, '');
      this.icon = cleanedIconPath
    }
    next()
  } catch(err){
    next(err)
  }
})

module.exports = MenuSchema