const { Admin } = require("../models");
let jwt = require("../helpers/jwt");
let bcrypt = require("../helpers/bcrypt");
class AdminController {
  static loginAdmin(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    Admin.findOne({
      where: {
        username: username
      }
    })
      .then(user => {
        if (user) {
          console.log(password, user.password, "<<<");
          // if (bcrypt.checkPassword(password, user.password)) {
          let token = jwt.createToken({ email: user.email, id: user.id });
          res.status(201).json({ token: token, id: user.id });
          // } else {
          //   let message = {
          //     status: "404",
          //     message: "Username or password wrong"
          //   };
          //   throw message;
          // }
        }
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = AdminController;
