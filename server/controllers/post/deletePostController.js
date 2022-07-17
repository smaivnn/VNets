const Post = require("../../model/Post");

const handlePostDelete = async (req, res) => {
  const POST_ID = req.body;
  const foundPost = await Post.findOne({ POST_ID }).exec();

  if (!foundPost) {
    return res.sendStatus(401);
  }

  try {
  } catch (error) {}
};

module.exports = { handlePostDelete };
