"use strict"
module.exports = (err, req, res, next) => {
    console.log(err, "ini buat liat console log==============");
    if (err.status && err.message) {
        res.status(err.status).json({ message: err.message })
    }
    // else if (err.message === "email/password wrong") {
    //     res.status(400).json({ message: err.errors[0].message })
    // }
    // else if (err.name === "JsonWebTokenError") {
    //     res.status(401).json({ message: "Unauthorized Invalid Token" })
    // }
    // else if (err.name === "CastError") {
    //     res.status(404).json({ message: "Data Not Found" })
    // }
    // else if (err.name === "SequelizeValidationError") {
    //     res.status(400).json({ message: err.errors[0].message })
    // }
    // else if (err.name === "ValidationError") {
    //     const arr = []
    //     err.errors.forEach(err => {
    //         arr.push({
    //             status: 400,
    //             msg: err.message
    //         })
    //     });
    //     res.status(400).json(arr)
    // }
    // else if (err.errors[0].message === "email already exist") {
    //     res.status(400).json({ message: err.errors[0].message })
    // }
    // else {
    //     res.status(500).json("Internal Server Error")
    // }
}
