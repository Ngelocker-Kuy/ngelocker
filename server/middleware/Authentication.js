const jwt = require("../helpers/jwt");

module.exports = function (req, res, next) {
  try {
    const token = req.headers.token;
    const user = jwt.verify(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
