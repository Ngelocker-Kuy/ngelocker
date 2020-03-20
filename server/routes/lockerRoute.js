const express = require("express");
const router = express.Router();
const lockerController = require("../controller/lockerController");
const Authentication = require("../middleware/Authentication");

router.use(Authentication);
router.get("/", lockerController.getLocker);
// router.delete("/:id", lockerController.deleteLocker);

module.exports = router;
