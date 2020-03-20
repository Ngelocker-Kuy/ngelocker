const { Admin } = require("../models");
const bcrypt = require("bcryptjs");
class AdminController {
  static loginAdmin(req, res, next) {
    let username = req.body.id;
    let password = req.body.password;
    Admin.findOne({
      where: {
        username: username
      }
    })
      .then(user => {
        if (user) {
          if (bcrypt.compareSync(password, user.password)) {
            let token = jwt.sign(
              { email: user.email, id: user.id },
              process.env.JWT_SECRET
            );
            res
              .status(201)
              .json({ token: token, id: user.id, role: user.role });
          } else {
            ///erorr
          }
        }
      })
      .catch(err => {
        if (err.message) {
          err.StatusCode = 400;
        }
        next(err);
      });
  }
}

module.exports = AdminController;
