const Post = require("../../model/Post");

const handleComment = async (req, res) => {
  const { POST_ID, USER_ID, USER_NICKNAME, COMMENT, DATE } = req.body;
  if (!POST_ID || !USER_ID || !USER_NICKNAME || !COMMENT || !DATE)
    return res.status(400).json({ message: "Fail comment." });

  const foundPost = await Post.findOne({ POST_ID }).exec();
  if (foundPost.VISIBLE === false) return res.sendStatus(401);

  const newComment = {
    USER_ID,
    USER_NICKNAME,
    COMMENT,
    DATE,
    VISIBLE: true,
  };
  try {
    let commentArray = foundPost.COMMENT;
    foundPost.COMMENT = [...commentArray, newComment];
    foundPost.save();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { handleComment };
