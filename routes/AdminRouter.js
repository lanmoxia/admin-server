var express = require('express')
var UserRouter = express.Router()
const UserController = require('../controllers/UserController')

UserRouter.post('/user/register', UserController.register)

module.exports = UserRouter