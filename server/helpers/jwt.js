const jwt = require('jsonwebtoken')

class Jwt {
  static createToken(token){
    return jwt.sign(token, "JWT_SECRET")
  }

  static verify(token){
    return jwt.verify(token, "JWT_SECRET")
  }
}

module.exports = Jwt