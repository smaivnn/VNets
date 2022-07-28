const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");
const registerController = require("../controllers/registerController");
const loginCookieController = require("../controllers/loginCookieController");
const logoutController = require("../controllers/logoutController");
const doubleCheckIdController = require("../controllers/auth/doubleCheckIdController");

router.post("/login", loginController.handleLogin);
router.post("/register", registerController.handleNewUser);
router.get("/loginCheck", loginCookieController.handlePageRefresh);
router.get("/logout", logoutController.handleLogout);
router.get("/doubleCheck", doubleCheckIdController.hanldeDoubleCheck);

module.exports = router;
