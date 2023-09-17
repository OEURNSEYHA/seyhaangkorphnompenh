const userController = require("../controller/userController");
const router = require("express").Router();
const multer = require("multer");
const upload = multer();
router.get("/users", userController.get);

router.post("/user/register",upload.none(), userController.register);

module.exports = router;
