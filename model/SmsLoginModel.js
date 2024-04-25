const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const adminAvatarUrl = 'http://localhost:3000/avatars/admin.png';
const userAvatarUrl = 'http://localhost:3000/avatars/user.jpg';


const SmsLoginSchema = new Schema({
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  sms_code: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user' // 默认为'user'
  },
  avatar: {
    type: String,
    default: userAvatarUrl // 默认头像
  }
}, { timestamps: true });

SmsLoginSchema.pre('save', async function(next) {
  if (this.isNew) {
    // 如果是新用户，检查是否已有用户
    const userCount = await this.model('mobile').countDocuments();
    this.role = userCount === 0 ? 'admin' : 'user'; // 第一个用户为'admin'
    this.avatar = userCount === 0 ? adminAvatarUrl : userAvatarUrl;
  }
  // 加密验证码
  this.sms_code = await bcrypt.hash(this.sms_code, 8);
  next();
});

const SmsLoginModel = mongoose.model('mobile', SmsLoginSchema);

module.exports = SmsLoginModel;
