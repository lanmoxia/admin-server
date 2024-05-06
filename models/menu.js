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
    default: false
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

module.exports = MenuSchema