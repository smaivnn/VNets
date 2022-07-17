const express = require("express");
const router = express.Router();
const fetchPostController = require("../controllers/post/fetchPostController");
const createPostController = require("../controllers/post/createPostController");
const editPostController = require("../controllers/post/editPostController");

router.get("/", fetchPostController.handlePostList);
router.post("/create", createPostController.handlePostCreate);
router.put("/edit/:POST_ID", editPostController.handleEditPost);

module.exports = router;
