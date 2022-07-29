const Post = require("../../model/Post");

//////////////////////////////////
// 삭제 VISIBLE사용 ? 할까 말까
//
//////////////////////////////////
const handleDeleteComment = async (req, res) => {
  const { USER_ID, DATE, POST_ID } = req.body;

  if (!USER_ID || !DATE || !POST_ID)
    return res
      .status(400)
      .json({ message: "NO POST_ID, USER_ID, DATE in req" });

  const foundPost = await Post.findOne({ POST_ID }).exec();
  if (!foundPost) {
    return res.sendStatus(401);
  }

  try {
    foundPost.COMMENT.map((comment, idx) => {
      if (comment.USER_ID === USER_ID && comment.DATE === DATE) {
        comment.VISIBLE = false;
      }
    });

    foundPost.markModified("COMMENT");
    foundPost.save();
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
};

module.exports = { handleDeleteComment };
