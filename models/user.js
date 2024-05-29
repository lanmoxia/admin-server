const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const adminAvatarUrl = process.env.ADMIN_AVATAR_URL;
const userAvatarUrl = process.env.USER_AVATAR_URL;
console.log()
// 用户模型定义
const UserType = {
  /**
   * 用户名
   */
  username: {
    type: String,
    unique: true, // 唯一性
    required: true
  },
  /**
   * 用户密码
   */
  password: {
    type: String,
    required: true,
    select: false // 默认查询不会返回该字段
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
let UserSchema = new Schema(UserType, { timestamps: true })

// 预保存钩子
UserSchema.pre('save', async function (next) {
  if (this.isNew) {
    const userCount = await mongoose.model('User').countDocuments()
    if (userCount === 0) {
      // 如果是第一个用户，则分配管理员角色
      const adminRole = await mongoose.model('Role').findOne({ name: 'supAdmin' })
      if(!adminRole)  next(new Error('Admin role not found'))
      this.roles = [adminRole._id]
      this.avatar = adminAvatarUrl
    } else {
      // 否则分配普通用户角色
      const userRole = await mongoose.model('Role').findOne({ name: 'user' })
      if(!userRole) next(new Error('User role not found'))
      this.roles = [userRole._id]
      this.avatar = userAvatarUrl
    }
    
    // 密码加密
    const hashedPassword = await bcrypt.hash(this.password, 10)
    this.password = hashedPassword
  }
  next()
})

module.exports = UserSchema