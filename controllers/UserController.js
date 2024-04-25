const UserService = require('../services/UserService')
const {setAccessToken,setRefreshToken} = require('../utils/JWT')
const adminData = require('../data/admin')
const {formatResponse} = require('../utils/unifieFormat')
const imageUploader = require('../utils/upload')

const UserController = {
  // 注册
  register: async(req, res) => {
    // 验证码
    if (!req.body.captcha_code || !req.session.captcha) {
      req.session.captcha = null;
      return res.status(200).json(formatResponse(10039, '验证码缺失'));
    }

    // 转换为统一的大小写进行比较
    const inputCaptcha = req.body.captcha_code.toLowerCase();
    const sessionCaptcha = req.session.captcha.toLowerCase();

    // 检查验证码是否匹配
    if (inputCaptcha !== sessionCaptcha) {
      req.session.captcha = null;
      return res.status(200).json(formatResponse(10040, '验证码错误'));
    }

    // 清除会话中的验证码
    req.session.captcha = null;

    // 处理用户注册
    const result = await UserService.register(req.body)
    if (result.error) {
      if (result.error === 'UserAlreadyExists') {
        return res.send(formatResponse(20001, '用户已存在'));
      } else {
        // 处理其他可能的错误
        return res.send(formatResponse(500, '服务器错误', result.details));
      }
    }
  
    // 成功响应
    const newUser = result.user;
    res.status(200).json(formatResponse(200, '注册成功', {
      id: newUser._id,
      username: newUser.username,
      avatar: newUser.avatar
    }));
  },
  // 登录
  login: async(req, res) => {
    // 确保验证码存在
    if (!req.body.captcha_code || !req.session.captcha) {
      req.session.captcha = null;
      // 验证码不存在
      return res.status(200).json(formatResponse(10039, '验证码缺失'));
    }

    // 转换为统一的大小写进行比较
    const inputCaptcha = req.body.captcha_code.toLowerCase();
    const sessionCaptcha = req.session.captcha.toLowerCase();

    // 检查验证码是否匹配
    if (inputCaptcha !== sessionCaptcha) {
      req.session.captcha = null;
      // 验证号码过期或错误
      return res.status(200).json(formatResponse(10040, '验证码错误'));
    }

    // 清除会话中的验证码
    req.session.captcha = null;

    // 处理用户登录
    const result = await UserService.login(req.body);
    if (result.error) {
      let statusCode = 401;
      let errorMessage = '登录失败';
      switch(result.error) {
        case 'UserNotFound':
          statusCode = '1004'
          errorMessage = '用户未找到';
          break;
        case 'PasswordMismatch':
          statusCode = '1005'
          errorMessage = '账户和密码不匹配';
          break;
        case 'ServerError':
          errorMessage = '服务器错误';
          statusCode = 500; // 服务器错误应该返回500状态码
          break;
      }
      return res.status(statusCode).send(formatResponse(statusCode, errorMessage));
    }

    // 成功响应
    const user = result;
    const accessToken = setAccessToken({ id: user._id, username: user.username });
    const refreshToken = setRefreshToken({ id: user._id, username: user.username });
    res.status(200).json(formatResponse(200, '登录成功', {
      info: {
        id: user._id,
        username: user.username,
        avatar: user.avatar
      },
      accessToken,
      refreshToken
    }));
  },
  // 获取用户
  getList: (req,res) => {
    try{
      res.status(200).json(formatResponse(200,'获取成功',adminData))
    } catch(error) {
      res.status(500).send(formatResponse(500,"服务器错误"))
    }
  },
  // 用户更新
  useAvatarUpdate: async (req, res) => {
    imageUploader(req, res, async function(err) {
      if (err) {
        // 如果imageUploader中发生错误，处理错误
        return res.send(formatResponse(500, '上传错误'));
      }
      const { id } = req.body;
      const filename = req.file.filename;
      const result = await UserService.useAvatarUpdate(id, filename);
      if (result.error) {
        let statusCode = 1004;
        let errorMessage = '用户未找到';
        if (result.error === 'ServerError') {
          statusCode = 500;
          errorMessage = '服务器错误';
        }
        return res.status(statusCode).send(formatResponse(statusCode, errorMessage));
      }
      // 成功响应
      const { avatar } = result;
      return res.status(200).json(formatResponse(200, '修改成功', { avatar }));
    });
  },

  // 获取公钥
  getPublicKey: async (req,res) => {
    try {
      const publicKey = await UserService.getPublicKey();
      res.status(200).send(formatResponse(200, '获取成功',{publicKey}));
    } catch (error) {
      res.status(500).send('Server error');
    }
  }
}

module.exports = UserController