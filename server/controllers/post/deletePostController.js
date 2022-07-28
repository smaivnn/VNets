const Post = require("../../model/Post");

const handlePostDelete = async (req, res) => {
  const { USER_ID, USER_NICKNAME, POST_ID } = req.body;

  console.log(req.body);
  if (!USER_ID || !USER_NICKNAME)
    return res.status(400).json({ message: "Fail delete post." });

  const foundPost = await Post.findOne({ POST_ID }).exec();

  if (!foundPost) {
    return res.sendStatus(401);
  }

  try {
    foundPost.VISIBLE = false;
    await foundPost.save(function (err, result) {
      if (err) {
        console.log("err", err);
      } else {
        console.log("result", result);
      }
    });

    res.status(200).json({
      message: `Delete success`,
      POST_ID,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handlePostDelete };
