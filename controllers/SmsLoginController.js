const SmsLoginService = require('../services/SmsLoginService');
const SmsLoginModel = require('../model/SmsLoginModel'); 
const {formatResponse} = require('../utils/unifieFormat')
const {setAccessToken,setRefreshToken} = require('../utils/JWT')

const SmsLoginController = {
  // 手机登录
login: async (req, res) => {
  const result = await SmsLoginService.login(req.body);
  if (result.error) {
    let statusCode = 401;
    let errorMessage = '登录失败';
    switch(result.error) {
      case 'MobileNotFound':
        errorMessage = '手机号未找到';
        break;
      case 'CodeMismatch':
        errorMessage = '验证码不匹配';
        break;
      case 'ServerError':
        statusCode = 500; // 服务器错误应该返回500状态码
        errorMessage = '服务器错误';
        console.log('error', result.details); // 记录错误详情
        break;
    }
    res.status(statusCode).send(formatResponse(statusCode, errorMessage));
    } else {
      // 登录成功后，删除验证码
      await SmsLoginModel.updateOne({ _id: result._id }, { sms_code: null });

      const accessToken = setAccessToken({ id: result._id, mobile: result.mobile });
      const refreshToken = setRefreshToken({ id: result._id, mobile: result.mobile });

      res.status(200).send(formatResponse(200, '登录成功', {
        info: {
          id: result._id,
          username: result.mobile,
          avatar: result.avatar
        },
        accessToken,
        refreshToken
      }));
    }
  }

}

module.exports = SmsLoginController;
