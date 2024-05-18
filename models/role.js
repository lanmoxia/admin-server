const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  /**
   * 角色名称
   */
  name: {
    type: String,
    required: true
  },
  /**
   * 角色描述
   */
  description: {
    type: String,
    default: ''
  },
  /**
   * 菜单权限
   */
  menus: {
    type: [Schema.Types.Object],
    ref: 'Menu', // 唯一性
  },
  /**
   * 资源权限
   */
  resources: {
    type: [Schema.Types.ObjectId],
    ref: 'Resource'
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

module.exports = RoleSchema

