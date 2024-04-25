const RoleService = require('../services/RoleService');
const roleData = require('../data/role')
const {formatResponse} = require('../utils/unifieFormat')

const RoleController = {
  // 获取角色列表
  getRoles: async (req, res) => {
    try {
      const roles = await RoleService.getRoles();
      res.status(200).send(formatResponse(200,'获取成功',roleData))
    } catch (error) {
      res.status(500).send(500,'服务器错误');
    }
  }
};

module.exports = RoleController;
