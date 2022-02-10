const user = require('express').Router()

// Controller
const UserController = require('../controller/UserController')

// Routes
user.post('/login', UserController.login)


module.exports = user