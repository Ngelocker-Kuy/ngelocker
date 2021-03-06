const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const Authentication = require("../middleware/Authentication");

router.post("/login", userController.userLogin);
router.post("/logout", userController.userLogout);
router.use(Authentication);
router.post("/", userController.createUser);
router.get("/", userController.getUser);
router.get("/:id", userController.findOne);
router.put("/:id", userController.updateUser);
// router.delete("/:id", userController.deleteUser);

module.exports = router;
