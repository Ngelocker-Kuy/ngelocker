const { User, Locker } = require("../models");
const jwt = require("../helpers/jwt");
const Bcrypt = require("../helpers/bcrypt");
class UserController {
  static getUser(req, res, next) {
    User.findAll()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(next);
  }

  static async createUser(req, res, next) {
    try {
      let dataUser = {
        name: req.body.username,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        lockerLabel: req.body.lockerLabel
      };
      const registerUser = await User.create(dataUser);
      const createLocker = await Locker.create({ UserId: registerUser.id });
      await User.update(
        { LockerId: createLocker.id },
        { where: { id: registerUser.id }, returning: true }
      );
      res.status(201).json({ user: registerUser, createLocker });
    } catch (error) {
      next(error);
    }
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
          res.status(200).json({ user: result[1][0].dataValues });
        } else {
          let message = {
            status: "404",
            message: "command not found"
          };
          throw message;
        }
      })
      .catch(next);
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
            res.status(200).json({
              token: token,
              user
            });
          } else {
            let message = {
              status: "404",
              message: "username/password wrong"
            };
            throw message;
          }
        } else {
          let mesaage = {
            status: "404",
            message: "username/password wrong"
          };
          throw mesaage;
          // next(msg)
        }
      })
      .catch(next);
  }
}

module.exports = UserController;
