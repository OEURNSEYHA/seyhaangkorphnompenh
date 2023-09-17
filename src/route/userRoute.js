const userController = require("../controller/userController");
const router = require("express").Router();
const multer = require("multer");
const requireAuth = require("../middleware/authmiddleware");

const upload = multer();
router.get("/users", requireAuth , userController.get );

router.post("/user/register",upload.none(), userController.register);
router.post("/user/login",upload.none(), userController.login);

module.exports = router;
