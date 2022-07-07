const express = require("express");
const router = express.Router();
const fetchPostController = require("../controllers/post/fetchPostController");
const createPostController = require("../controllers/post/createPostController");

router.get("/", fetchPostController.handlePostList);
router.post("/create", createPostController.handlePostCreate);

module.exports = router;
