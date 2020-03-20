const express = require("express");
const router = express.Router();
const AdminRoute = require("./adminRoute");
const GuestRoute = require("./guestRoute");
const LockerRoute = require("./lockerRoute");
const UserRoute = require("./userRoute");

router.use("/admin", AdminRoute);
router.use("/user", UserRoute);
router.use("/locker", LockerRoute);
router.use("/guest", GuestRoute);

module.exports = router;
