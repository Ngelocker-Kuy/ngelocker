const express = require("express");
const router = express.Router();
const AdminRoute = require("./adminRoute");
const GuestRoute = require("./guestRoute");
const LockerRoute = require("./lockerRoute");
const UserRoute = require("./userRoute");

router.use("/admin", AdminRoute);
router.use("/users", UserRoute);
router.use("/lockers", LockerRoute);
router.use("/guests", GuestRoute);

module.exports = router;
