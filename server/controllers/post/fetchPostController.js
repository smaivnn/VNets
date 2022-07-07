const Post = require("../../model/Post");

const handlePostList = async (req, res) => {
  const { CLASSIFICATION } = req.body;
  const matchedPost = Post.find({ CLASSIFICATION: CLASSIFICATION }).exec();
  if (!matchedPost) {
    return res.sendStatus(401);
  }

  res.json({ matchedPost });
};

module.exports = { handlePostList };
