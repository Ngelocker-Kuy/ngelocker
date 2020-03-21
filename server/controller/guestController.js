const { Guest, User } = require("../models");
const redis = require('../services/redis')

class GuestController {
  static async getGuest(req, res, next) {
    let listGuest = await redis.get("listGuest")

    if (listGuest) {
      res.status(200).json(JSON.parse(listGuest))
    } else {
      Guest.findAll({ where: { UserId: req.user.id } })
        .then(result => {
          redis.set('listGuest', JSON.stringify(result))

          res.status(200).json(result);
        })
        .catch(next)
    }
  }

  static createGuest(req, res, next) {
    let body = {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      status: false,
      UserId: req.body.UserId
    };
    Guest.create(body)
      .then(result => {
        redis.del('listGuest')
        res.status(201).json({ guest: result.dataValues });
      })
      .catch(next)
  }

  static updateGuest(req, res, next) {
    let status = { status: true };
    Guest.update(status, { where: { id: req.params.id }, returning: true })
      .then(result => {
        if (result[0] != 0) {
          redis.del('listGuest')
          res.status(200).json({ guest: result[1][0].dataValues });
        } else {
          let message = {
            status: "404",
            message: "Guest not found"
          };
          throw message;
        }
      })
      .catch(next)
  }

  static deleteGuest(req, res, next) {
    Guest.findOne({ where: { id: req.params.id } })
      .then(result => {
        if (result != null) {
          redis.del('listGuest')
          return result.destroy();
        } else {
          let message = { status: 404, message: "Guest not found" };
          throw message;
        }
      })
      .then(result => {
        res.status(200).json({ message: "Guest has been deleted" });
      })
      .catch(next);
  }
}

module.exports = GuestController;
