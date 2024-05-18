const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');
const adminAvatarUrl = 'http://localhost:3000/avatars/admin.png'
const userAvatarUrl = 'http://localhost:3000/avatars/user.jpg'


const MobileUserType = {

  /**
   * 手机号
   */
  mobile: {
    type: String,
    required: true,
    unique: true
  },

  /**
   * 手机验证码
   */
  sms_code: {
    type: String,
    required: true
  },

  /**
   * 姓名
   */
  name: {
    type: String,
    default: '', 
  },

  /**
   * 用户头像
   */
  avatar: {
    type: String,
    default: ''
  },

  /**
   * 角色
   */
  roles: {
    type: [Schema.Types.ObjectId],
    ref: 'Role'
  },

  /**
   * 状态
   * 0： 未启用
   * 1：启用
   */
  status: {
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
}

// 启用timestamps自动添加创建和更新时间戳
let MobileUserSchema = new Schema(MobileUserType, { timestamps: true });

MobileUserSchema.pre('save', async function(next) {
  if (this.isNew) {
    const userCount = await mongoose.model('MobileUser').countDocuments();
    if (userCount === 0) {
      // 如果是第一个用户，则分配管理员角色
      const adminRole = await mongoose.model('Role').findOne({ name: 'supAdmin' })
      if(!adminRole)  next(new Error('Admin role not found'))
      this.roles = [adminRole._id];
      this.avatar = adminAvatarUrl;
    } else {
      // 否则分配普通用户角色
      const userRole = await mongoose.model('Role').findOne({ name: 'user' })
      if(!userRole) next(new Error('User role not found'))
      this.roles = [userRole._id]
      this.avatar = userAvatarUrl
    }
    // 加密验证码
    this.sms_code = await bcrypt.hash(this.sms_code, 8)
  }
  next()
})

module.exports = MobileUserSchema
