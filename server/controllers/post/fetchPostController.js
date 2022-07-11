const Post = require("../../model/Post");

const handlePostList = async (req, res) => {
  try {
    const response = await Post.find({}).exec();

    if (!response) {
      return res.sendStatus(401);
    }
    console.log(response);

    res.json({ response });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { handlePostList };

//get으로오는거 json형식으로바꾸기 ??
//
