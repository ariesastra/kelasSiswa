const { User } = require('../models')

const createClass = async (req, res, next) => {
  try {
    const { role, id: userId } = req.auth

    if (role !== 'admin') throw { name: 'FORBIDDEN_ACCESS'}
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createClass
}