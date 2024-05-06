const {SmsLogin} = require('../models')
const bcrypt = require('bcrypt');

const SmsLoginService = {
  login: async ({ mobile, sms_code }) => {
    try {
      const user = await SmsLogin.findOne({ mobile });

      if (!user) {
        return { error: 'MobileNotFound' };
      }
      const isMatch = await bcrypt.compare(sms_code, user.sms_code);
      if (!isMatch) {
        return { error: 'CodeMismatch' };
      }
      
      return user;
    } catch (error) {
      return { error: 'ServerError', details: error.message };
    }
  }
}

module.exports = SmsLoginService;
