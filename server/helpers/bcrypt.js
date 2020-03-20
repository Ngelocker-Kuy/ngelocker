const bcrypt = require('bcrypt')

class Bcrypt {
  static hashPassword(password){
    let salt = 10
    return bcrypt.hashSync(password, salt)
  }

  static checkPassword(password, hashPass){
    return bcrypt.compareSync(password, hashPass)
  }
}

module.exports = Bcrypt