const SmsCodeService = require('../services/SmsCodeService')
const {formatResponse} = require('../utils/unifieFormat')

const SmsCodeController = {
  // 获取短信验证码
  getCode: async (req, res) => {
    const mobile = req.body.mobile;
    const result = await SmsCodeService.getCode(mobile);
    if (result.error) {
      res.status(500).json(formatResponse(500, "生成验证码失败"));
    } else {
      // 成功响应
      res.status(200).json(formatResponse(
        200, 
        "获取成功",
        { code: result }
      ));
    }
  }
}

module.exports = SmsCodeController;