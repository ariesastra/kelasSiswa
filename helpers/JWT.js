const jwt = require('jsonwebtoken')

const sign = (payload) => {
  return jwt.sign(payload, process.env.SIGNATURE)
}

const verify = (access_token) => {
  return jwt.verify(access_token, process.env.SIGNATURE)
}

module.exports = {
  sign,
  verify
}