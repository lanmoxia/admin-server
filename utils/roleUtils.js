const {Role} = require('../models')

const getRoleMapping = async () => {
  const roles = await Role.find({})
  const roleMapping = {}
  roles.forEach(role => {
    roleMapping[role.name] = role._id
  })
  return roleMapping;
}

module.exports = {
  getRoleMapping
}
