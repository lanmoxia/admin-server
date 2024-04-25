const SmsLoginModel = require('../model/SmsLoginModel');

const SmsCodeService = {
  // 获取短信验证码
  getCode: async (mobile) => {
    try {
      let code = Math.floor(100000 + Math.random() * 900000).toString();
      // 将加密后的验证码存储到数据库
      const user = await SmsLoginModel.findOne({ mobile });
      if (user) {
        // 由于 Mongoose 的文档缓存导致当您调用 findOne 方法时，Mongoose 会返回一个文档对象
        // 这个对象会在您对其进行操作时保持状态。
        //如果您在调用 save 方法之前没有更新 sms_code 字段，那么即使数据库中的数据已经更新
        //文档对象中的 sms_code 也不会改变。
        user.sms_code = code; // 更新 code
        user.lastRequestedCodeAt = new Date()
        await user.save();
      } else {
        newUser = new SmsLoginModel({mobile,sms_code: code});
        await newUser.save();
      }
      // 实际应用中不应返回验证码，这里只是示例
      return code;
    } catch (error){
      return { error: 'ServerError', details: error.message };
    }
  }
}

module.exports = SmsCodeService;