const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const adminAvatarUrl = 'http://localhost:3000/avatars/admin.png';
const userAvatarUrl = 'http://localhost:3000/avatars/user.jpg';

// 设置默认角色ID和默认头像URL
const UserType = {
  username: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, default: userAvatarUrl },
  role: {type: String, default: 'user'}
};

// 启用timestamps自动添加创建和更新时间戳
let UserSchema = new Schema(UserType, { timestamps: true });

// 预保存钩子
UserSchema.pre('save', async function (next) {
  // 如果是新用户
  if (this.isNew) {
    const userCount = await mongoose.model('user').countDocuments();
    this.role = userCount === 0 ? 'admin' : 'user'; // 第一个用户为'admin'
    this.avatar = userCount === 0 ? adminAvatarUrl : userAvatarUrl;
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
  next();
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
