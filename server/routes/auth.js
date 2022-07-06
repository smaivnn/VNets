const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");
const registerController = require("../controllers/registerController");
const loginCookieController = require("../controllers/loginCookieController");

router.post("/login", loginController.handleLogin);
router.post("/register", registerController.handleNewUser);
router.get("/loginCheck", loginCookieController.handlePageRefresh);

module.exports = router;
