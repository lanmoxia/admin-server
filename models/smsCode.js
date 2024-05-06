const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SmsCodeSchema = new Schema({
  mobile: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '1m' } // 验证码5分钟后过期
});

module.exports = SmsCodeSchema;
