const UserModel = require('../model/UserModel');
const SmsLoginModel = require('../model/SmsLoginModel');
const jwt = require('jsonwebtoken');
const { secret } = require('../utils/JWT');
const { formatResponse } = require('../utils/unifieFormat');
const adminData = require('../data/adminPermission');
const userData = require('../data/userPermission');

const PermissionController = {
  getPermissions: async (req, res) => {
    try {
      const bearerToken = req.headers.authorization;
      if (!bearerToken) {
        return res.status(401).send(formatResponse(401, "未授权：请联系管理员"));
      }
      const token = bearerToken.split(' ')[1]
      const decoded = jwt.verify(token, secret);
      let user = await UserModel.findById(decoded.id).populate('role');
      
      // 如果在UserModel中找不到用户，尝试在SmsLoginModel中查找
      if (!user) {
        user = await SmsLoginModel.findById(decoded.id);
      }

      if (!user) {
        return res.status(404).send({ code: 404, error: "用户未找到" });
      }

      // 假设SmsLoginModel中也有role字段
      const permissionData = user.role === 'admin' ? adminData : userData;
      res.status(200).send(formatResponse(200, '获取成功', permissionData));
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        // 这里处理JWT验证失败的错误
        return res.status(401).send(formatResponse(401, "无效的token"));
      } else {
        // 其他错误，可能是服务器错误
        return res.status(500).send(formatResponse(500, "服务器错误"));
      }
    }
  }
};

module.exports = PermissionController;