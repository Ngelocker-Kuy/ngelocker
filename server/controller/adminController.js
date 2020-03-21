const { Admin } = require("../models");
let jwt = require("../helpers/jwt");
let bcrypt = require("../helpers/bcrypt");
class AdminController {
  static loginAdmin(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    Admin.findOne({
      where: {
        username,
        password
      }
    })
      .then(user => {
        console.log(user, "<<<");
        if (user) {
          // if (bcrypt.checkPassword(password, user.password)) {
          let token = jwt.createToken({ email: user.email, id: user.id });
          res.status(200).json({ token: token, admin: user });
        } else {
          let message = {
            status: "404",
            message: "username/password wrong"
          };
          throw message;
        }
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = AdminController;
