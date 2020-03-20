const { User, Locker } = require("../models");
const jwt = require("../helpers/jwt");
const Bcrypt = require("../helpers/bcrypt");
class UserController {
  static getUser(req, res, next) {
    User.findAll()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        next(err);
      });
  }

  static async createUser(req, res, next) {
    try {
      let dataUser = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
      };
      const registerUser = await User.create(dataUser);
      const createLocker = await Locker.create({ UserId: registerUser.id });
      await User.update(
        { LockerId: createLocker.id },
        { where: { id: registerUser.id }, returning: true }
      );
      res.status(201).json({ registerUser, createLocker });
    } catch (error) {
      next(err);
    }
  }

  static deleteUser(req, res, next) {
    User.findOne({ where: { id: req.params.id } })
      .then(result => {
        if (result != null) {
          return User.destroy({
            where: { id: req.params.id }
          });
        } else {
          let message = { status: 404, message: "User not found" };
          throw message;
        }
      })
      .then(result => {
        res.status(200).json({ message: "User has been deleted" });
      })
      .catch(err => {
        next(err);
      });
  }

  static updateUser(req, res, next) {
    let body = {
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    };
    User.update(body, { where: { id: req.params.id }, returning: true })
      .then(result => {
        if (result[0] != 0) {
          res.status(200).json(result[1][0].dataValues);
        } else {
          let message = {
            status: "404",
            message: "command not found"
          };
          throw message;
        }
      })
      .catch(err => {
        next(err);
      });
  }

  static userLogin(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    User.findOne({
      where: {
        username: username
      }
    })
      .then(user => {
        if (user) {
          if (Bcrypt.checkPassword(password, user.password)) {
            let token = jwt.createToken({ email: user.email, id: user.id });
            res.status(201).json({ token: token, id: user.id });
          } else {
            let message = {
              status: "404",
              message: "Username or password wrong"
            };
            throw message;
          }
        } else {
          let mesaage = {
            StatusCode: "404",
            message: "command not found"
          };
          throw mesaage;
          // next(msg)
        }
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = UserController;
