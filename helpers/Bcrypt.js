const bcrypt = require('bcryptjs')

const hashPlain = (plain) => {
  return hash = bcrypt.hashSync(plain, 10)
}

const compareHash = (plain, hash) => {
  return compare = bcrypt.compareSync(plain, hash)
}

module.exports ={
  hashPlain,
  compareHash
}