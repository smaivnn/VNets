const Post = require("../../model/Post");

const handleEditPost = async (req, res) => {
  const {
    USER_ID,
    USER_NICKNAME,
    TITLE,
    CLASSIFICATION,
    DESCRIPTION,
    POST_ID,
  } = req.body;

  if (!USER_ID || !USER_NICKNAME || !TITLE || !CLASSIFICATION || !DESCRIPTION)
    return res.status(400).json({ message: "Fail create post." });

  const foundPost = await Post.findOne({ POST_ID }).exec();

  if (!foundPost) {
    return res.sendStatus(401);
  }

  try {
    foundPost.TITLE = TITLE;
    foundPost.CLASSIFICATION = CLASSIFICATION;
    foundPost.DESCRIPTION = DESCRIPTION;
    await foundPost.save();

    res.status(201).json({
      POST_ID,
      TITLE,
      DESCRIPTION,
      CLASSIFICATION,
      success: `Edit post TITLE : ${TITLE} success`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleEditPost };
