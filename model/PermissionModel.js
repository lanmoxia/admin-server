const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 定义认证信息模式
const AuthSchema = new Schema({
  role: {
    type: String,
    required: true
  },
  permissions: [String]
}, { _id: false });

// 定义元数据模式
const MetaSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  icon: String,
  roles: [String],
  auths: [AuthSchema],
  hidden: Boolean
}, { _id: false });

// 定义权限模型的递归模式
const PermissionSchema = new Schema({
  path: {
    type: String,
    required: true
  },
  name: String,
  meta: MetaSchema,
  children: [this] // 递归结构
},{ timestamps: true })

module.exports = Permission = mongoose.model('Permission', PermissionSchema);