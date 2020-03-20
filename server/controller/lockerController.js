const { Locker } = require("../models");

class LockerController {
  static getLocker(req, res, next) {
    Locker.findAll()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(next);
  }

  // static deleteLocker(req, res, next) {
  //   let deleted = null;
  //   Locker.findOne({ where: { id: req.params.id } })
  //     .then(result => {
  //       if (result != null) {
  //         deleted = result;
  //         return Locker.destroy({
  //           where: { id: req.params.id }
  //         });
  //       } else {
  //         let message = { status: 404, message: "Locker not found" };
  //         throw message;
  //       }
  //     })
  //     .then(result => {
  //       res.status(200).json({ locker: deleted });
  //     })
  //     .catch(err => {
  //       next(err);
  //     });
  // }
}

module.exports = LockerController;
