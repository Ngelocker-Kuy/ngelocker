const jwt = require("../helpers/jwt");

module.exports = function(req, res, next) {
  try {
    const token = req.headers.token;
    const user = jwt.verify(token);
    console.log(user);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized Invalid Token" });
  }
};
