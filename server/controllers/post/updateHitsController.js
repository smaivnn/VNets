const Post = require("../../model/Post");

const handleUpdateHits = async (req, res) => {
  const { POST_ID } = req.body;
  const foundPost = await Post.findOne({ POST_ID }).exec();

  if (foundPost.VISIBLE === false) {
    return res.sendStatus(401);
  }

  try {
    foundPost.HITS = foundPost.HITS + 1;
    foundPost.save();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { handleUpdateHits };
