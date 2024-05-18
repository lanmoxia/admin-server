const { setAccessToken, setRefreshToken, secret} = require('../utils/JWT')
const jwt = require('jsonwebtoken')

const RefreshService = {
  getRefreshToken: async (token) => {
    try {
      const decoded = await jwt.verify(token, secret);
      const id = decoded.id;
      const username = decoded.username;
      const newAccessToken = setAccessToken({ id, username });
      const newRefreshToken = setRefreshToken({ id, username });
      return { 
        code: 200,
        message: '长token有效,请求到新的token',
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      };
    } catch (error) {
      console.log('RefreshService catch error', error);
      throw { code: 10032, message: 'refreshToken 无效' };
    }
  }
}

module.exports = RefreshService;
