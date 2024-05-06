const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 定义验证码模型的结构
const captchaSchema = new Schema({
  text: { type: String, required: true }, // 验证码文本
  createdAt: { type: Date, default: Date.now, expires: '5m' } // 创建时间，默认5分钟后过期
});

module.exports = captchaSchema;
