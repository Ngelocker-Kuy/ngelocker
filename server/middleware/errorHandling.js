"use strict";
module.exports = (err, req, res, next) => {
    // console.log(err, "ini buat liat console log==============");
    if (err.status && err.message) {
        res.status(err.status).json({ message: err.message });
    } else if (err.name === "JsonWebTokenError") {
        res.status(401).json({ message: "Unauthorized Invalid Token" });
    } else if (err.name === "SequelizeValidationError") {
        res.status(400).json({ message: err.errors[0].message });
    } else if (err.message === "email already exist") {
        res.status(400).json({ message: "email already exist" });
    }
};
