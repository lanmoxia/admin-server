const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const adminAvatarUrl = 'http://localhost:3000/avatars/admin.png';
const userAvatarUrl = 'http://localhost:3000/avatars/user.jpg';

// 用户模型定义
const UserType = {
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: userAvatarUrl },
  roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }]
};

// 启用timestamps自动添加创建和更新时间戳
let UserSchema = new Schema(UserType, { timestamps: true });

// 预保存钩子
UserSchema.pre('save', async function (next) {
  if (this.isNew) {
    const userCount = await mongoose.model('User').countDocuments();
    if (userCount === 0) {
      // 如果是第一个用户，则分配管理员角色
      const adminRole = await mongoose.model('Role').findOne({ name: 'admin' });
      this.roles = [adminRole._id];
      this.avatar = adminAvatarUrl;
    } else {
      // 否则分配普通用户角色
      const userRole = await mongoose.model('Role').findOne({ name: 'user' });
      this.roles = [userRole._id];
      this.avatar = userAvatarUrl;
    }
    
    // 密码加密
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
  next();
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;