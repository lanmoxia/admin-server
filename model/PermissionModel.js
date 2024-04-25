const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 按钮模型
const ButtonSchema = new Schema({
  name: { type: String, required: true },
  parent_id: { type: Schema.Types.ObjectId, ref: 'Permission' },
  type: { type: Number, required: true },
  url: { type: String, required: true }
}, { _id: false });

// 权限模型
const PermissionSchema = new Schema({
  name: { type: String, required: true },
  parent_id: { type: Schema.Types.ObjectId, ref: 'Permission', default: null }, // 现在是可选的
  type: { type: Number, required: true },
  url: { type: String, required: true },
  icon: { type: String, required: true },
  children: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Permission'
    }
  ],
  buttonList: { type: [ButtonSchema], default: undefined },
  hidden: { type: Boolean, default: false }
}, { timestamps: true });

// 递归子文档结构
PermissionSchema.add({ children: [PermissionSchema] });

const PermissionModel = mongoose.model('Permission', PermissionSchema);

module.exports = PermissionModel