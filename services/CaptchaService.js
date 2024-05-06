const captcha = require('svg-captcha');
const {Captcha} = require('../models')

const CaptchaService = {
  generateCaptcha: () => {
    try {
      // 验证码生成错误测试
      // const shouldFail = true; // 或者使用某种条件来触发失败
      // if (shouldFail) {
      //   throw new Error('故意引入的错误');
      // }
      const cap = captcha.create({
        size: 2,
        ignoreChars: '0o1i',
        noise: 2,
        color: true,
        background: '#cc9966'
      });
      return cap
    } catch (error) {
      return { error: 'ServerError', details: error.message }
      // 验证码生成错误测试
     //return { error: true, code: 'CAPTCHA_GENERATION_FAILED', details: error.message };
    }
  }
};

module.exports = CaptchaService;
