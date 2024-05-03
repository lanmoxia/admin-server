const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: '角色' }, // 角色描述
  isDefault: { type: Boolean, default: false }, // 是否为默认角色
  permissions: [{
    permission: { type: mongoose.Schema.Types.ObjectId, ref: 'Permission' },
    actions: [String]
  }] // 关联权限模型
}, { timestamps: true }); // 启用时间戳

const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;