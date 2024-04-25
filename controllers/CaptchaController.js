// controllers/CaptchaController.js

const CaptchaService = require('../services/CaptchaService');
const crypto = require('crypto') // 引入Node.js的crypto模块来生成哈希值
const {formatResponse} = require('../utils/unifieFormat')

const CaptchaController = {
  // 获取验证码
  getCaptcha: (req, res) => {
    const result = CaptchaService.generateCaptcha();
    if (result.error) {
      return res.status(500).json(formatResponse(500, "验证码生成失败"));
    }
    // 生成一个随机的code_key
    const code_key = crypto.randomBytes(20).toString('hex');
    req.session.captcha = result.text; // 存储验证码文本以便后续验证
    req.session.code_key = code_key; // 存储code_key以便后续验证
    res.status(200).json(formatResponse(
      200, 
      "获取成功",
      {
        code: result.text, // 验证码文本
        code_key: code_key // 唯一标识符
      }
    ))
  }
}

module.exports = CaptchaController;
