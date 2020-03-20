const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const Authentication = require("../middleware/Authentication");

router.post("/login", userController.userLogin);
router.use(Authentication);
router.post("/", userController.createUser);
router.get("/", userController.getUser);
router.put("/:id", userController.updateUser);

module.exports = router;
