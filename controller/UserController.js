// Dependencies
const { User } = require('../models')
const { compareHash } = require('../helpers/Bcrypt')
const { sign } = require('../helpers/JWT')

class UserController{
  static async login(req, res, next){
    try {
      const {
        email,
        password
      } = req.body

      const cekUser = await User.findOne({
        where: {
          email
        }
      })
      if(!cekUser) throw { name: 'INVALID_CREDENTIALS'}

      const cekPassword = compareHash(password, cekUser.password)
      if(!cekPassword) throw { name: 'INVALID_CREDENTIALS'}

      const payload = {
        id: cekUser.id,
        email,
        firstName: cekUser.firstName,
        lastName: cekUser.lastName,
        role: cekUser.role
      }

      const access_token = sign(payload)

      res.status(200).json({access_token})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController