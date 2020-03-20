const express = require("express");
const router = express.Router();
const guestController = require("../controller/guestController");
const Authentication = require("../middleware/Authentication");

router.post("/", guestController.createGuest);
router.use(Authentication);
router.get("/", guestController.getGuest);
router.put("/:id", guestController.updateGuest);
router.delete("/:id", guestController.deleteGuest);

module.exports = router;
