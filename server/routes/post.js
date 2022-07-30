const express = require("express");
const router = express.Router();
const fetchPostController = require("../controllers/post/fetchPostController");
const createPostController = require("../controllers/post/createPostController");
const editPostController = require("../controllers/post/editPostController");
const deletePostController = require("../controllers/post/deletePostController");
const recentPostController = require("../controllers/post/recentPostController");
const addCommentController = require("../controllers/post/addCommentController");
const likeBtnController = require("../controllers/post/likeBtnController");
const bestPostController = require("../controllers/post/bestPostController");
const editCommentController = require("../controllers/post/editCommentController");
const deleteCommentController = require("../controllers/post/deleteCommentController");
const updateHitsController = require("../controllers/post/updateHitsController");

router.get("/", fetchPostController.handlePostList);
router.post("/create", createPostController.handlePostCreate);
router.put("/edit/:POST_ID", editPostController.handleEditPost);
router.put("/delete/:POST_ID", deletePostController.handlePostDelete);
router.get("/recent", recentPostController.handleRecentPost);
router.post("/comment/:POST_ID", addCommentController.handleComment);
router.put("/like/:POST_ID", likeBtnController.handleLikeBtnClicked);
router.get("/best", bestPostController.handleBestPost);
router.put("/comment/edit/:POST_ID", editCommentController.handleEditComment);
router.put(
  "/comment/delete/:POST_ID",
  deleteCommentController.handleDeleteComment
);
router.post("/hits/:POST_ID", updateHitsController.handleUpdateHits);

module.exports = router;
