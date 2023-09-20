const userController = require("../controller/userController");
const router = require("express").Router();
const multer = require("multer");
const  requireAuth   = require("../middleware/authMiddleware");
const {  BlackListRoute } = require("../middleware/tokenBlackList");

const upload = multer();
router.get("/users", BlackListRoute, requireAuth,   userController.get );

router.post("/user/register",upload.none(), userController.register);
router.post("/user/login",upload.none(), userController.login);
router.post("/user/logout", upload.none(), userController.logout)
module.exports = router;
