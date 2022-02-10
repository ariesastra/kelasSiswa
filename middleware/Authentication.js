const { verify } = require('../helpers/JWT')
const { User } = require('../models')

const authenticate = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const payload = verify(access_token);

    if (!User.findOne({ where: { id: payload.id } })) {
      throw { name: "FORBIDDEN_ACCESS" };
    }
    req.auth = {
      ...payload,
    };

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  authenticate
}