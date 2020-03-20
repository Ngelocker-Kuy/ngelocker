const { Admin, User, Locker } = require("../models");
const bcrypt = require("bcryptjs");
let jwt = require("../");
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
        // if (err.message) {
        //   err.StatusCode = 400;
        // }
        next(err);
      });
  }

  static getUser(req, res, next) {
    User.findAll()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        next(err);
      });
  }

  static createUser(req, res, next) {
    let dataUser = {
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    };
    User.create(dataUser)
      .then(result => {
        let token = jwt.sign({ email: dataUser.email, id: dataUser.id });
      })
      .catch(err => {
        next(err);
      });
  }

  static createLocker(req, res, next) {
    Locker.create({ UserId: req.body.UserId })
      .then(result => {
        res.status(201).json(result);
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = AdminController;
