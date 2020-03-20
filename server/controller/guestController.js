const { Guest, User } = require("../models");

class GuestController {
  static getGuest(req, res, next) {
    Guest.findAll({ where: { UserId: req.user.id } })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        next(err);
      });
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
        res.status(201).json({ guest: result });
      })
      .catch(err => {
        next(err);
      });
  }

  static updateGuest(req, res, next) {
    let status = { status: true };
    Guest.update(status, { where: { id: req.params.id }, returning: true })
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

  static deleteGuest(req, res, next) {
    console.log(req.params.id, "<<<");
    Guest.findOne({ where: { id: req.params.id } })
      .then(result => {
        if (result != null) {
          return Guest.destroy({
            where: { id: req.params.id, UserId: req.user.id }
          });
        } else {
          let message = { status: 404, message: "Guest not found" };
          throw message;
        }
      })
      .then(result => {
        res.status(200).json({ message: "Guest has been deleted" });
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = GuestController;
