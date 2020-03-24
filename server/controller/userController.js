const { User, Locker } = require("../models");
const jwt = require("../helpers/jwt");
const Bcrypt = require("../helpers/bcrypt");
const redis = require('../services/redis')

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
    let password = Bcrypt.hashPassword(req.body.password)

    let body = {
      name: req.body.name,
      password,
      email: req.body.email
    };

    User.update(body, { where: { id: req.user.id }, returning: true })
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
    let tokenExpo = req.body.tokenExpo;
    let token = "";

    User.findOne({
      where: {
        username: username
      }
    })
      .then(user => {
        if (user) {
          if (Bcrypt.checkPassword(password, user.password)) {
            token = jwt.createToken({ email: user.email, id: user.id });
            // this.updateToken(user, token);
            return user.update({ tokenExpo });
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
      .then(result => {
        res.status(200).json({
          token: token,
          user: result
        });
      })
      .catch(next);
  }

  static async findUser(id) {
    try {
      return await User.findOne({
        where: {
          id
        }
      });
    } catch (err) {
      return err;
    }
  }

  static findOne(req, res, next) {
    User.findOne({ where: { id: req.params.id } })
      .then(result => {
        if (result) {
          res.status(200).json(result);
        } else {
          let mesaage = {
            status: "404",
            message: "user not found"
          };
          throw mesaage;
        }
      })
      .catcH(err => {
        next(err);
      });
  }

  static userLogout(req, res, next) {
    redis.del('listGuest')

    res.status(200).json({ msg: "Logout successfull" })
  }
}

module.exports = UserController;
