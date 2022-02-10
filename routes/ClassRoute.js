const classRouter = require('express').Router()
const { authenticate } = require('../middleware/Authentication')
const { createClass } = require('../middleware/Authorization')

// Controller
const ClassController = require('../controller/ClassController')

classRouter.get('/', ClassController.getAll)
classRouter.get('/:id', ClassController.getDetail)
classRouter.post(
  '/create-class',
  authenticate,
  createClass,
  ClassController.createClass
)
classRouter.patch(
  '/check-in',
  authenticate,
  ClassController.checkIn
)
classRouter.patch(
  '/check-out',
  authenticate,
  ClassController.checkOut
)

module.exports = classRouter
