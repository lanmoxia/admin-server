// const RefreshService = require('../services/RefreshService');
// const {formatResponse} = require('../utils/unifieFormat')

// const RefreshController = {
//   getRefreshToken: async (req, res) => {
//     try {
//       console.log(req.headers)
//       const bearerToken = req.headers.pass;
//       if (!bearerToken) {
//         return res.status(400).json(formatResponse(10042, "refreshToken 缺失"));
//       }
//       const token = bearerToken.split(' ')[1];
//       const result = await RefreshService.getRefreshToken(token);
//       res.json(formatResponse(        
//         result.code,
//         result.message,
//         {
//           info: {
//             accessToken: result.accessToken,
//             refreshToken: result.refreshToken
//           }
//         }
//       ))
//     } catch (error) {
//       console.log('RefreshController catch error', error);
//       res.status(200).json(formatResponse(error.code, error.msg));
//     }
//   }
// }

// module.exports = RefreshController;
