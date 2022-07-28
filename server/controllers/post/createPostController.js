const Post = require("../../model/Post");

const handlePostCreate = async (req, res) => {
  console.log(req.body);
  const { USER_ID, USER_NICKNAME, TITLE, CLASSIFICATION, DESCRIPTION } =
    req.body;
  if (!USER_ID || !USER_NICKNAME || !TITLE || !CLASSIFICATION || !DESCRIPTION)
    return res.status(400).json({ message: "Fail create post." });

  try {
    const result = await Post.create({
      USER_ID,
      USER_NICKNAME,
      TITLE,
      CLASSIFICATION,
      DESCRIPTION,
    });
    console.log("New Post", result);

    res.status(201).json({
      result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handlePostCreate };
