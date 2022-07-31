const express = require("express");
const router = express.Router();
const editUserProfileController = require("../controllers/user/editUserProfileController");

router.put(
  "/edit/:USER_studentID",
  editUserProfileController.handleEditUserProfile
);

module.exports = router;
