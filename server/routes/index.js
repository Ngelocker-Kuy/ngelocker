const express = require("express");
const router = express.Router();
const AdminRoute = require("./adminRoute");

router.use("/admin", AdminRoute);

module.exports = router;
