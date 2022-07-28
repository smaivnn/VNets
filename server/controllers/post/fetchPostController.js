const Post = require("../../model/Post");

const handlePostList = async (req, res) => {
  try {
    const foundPost = await Post.find({ VISIBLE: true }).exec();

    if (!foundPost) {
      return res.sendStatus(401);
    }

    res.json({ foundPost });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { handlePostList };

//get으로오는거 json형식으로바꾸기 ??
//
