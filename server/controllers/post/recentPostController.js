const Post = require("../../model/Post");

/*
 추후에 다시 바꾸기.
 지금은 일단 기능 동작하게.
 */
const handleRecentPost = async (req, res) => {
  const { category } = req.query;

  try {
    const notice = await Post.find({
      VISIBLE: true,
      CLASSIFICATION: category[0],
    })
      .sort({ POST_ID: -1 })
      .limit(5);

    const question = await Post.find({
      VISIBLE: true,
      CLASSIFICATION: category[1],
    })
      .sort({ POST_ID: -1 })
      .limit(5);
    const study = await Post.find({
      VISIBLE: true,
      CLASSIFICATION: category[2],
    })
      .sort({ POST_ID: -1 })
      .limit(5);
    const community = await Post.find({
      VISIBLE: true,
      CLASSIFICATION: category[3],
    })
      .sort({ POST_ID: -1 })
      .limit(5);

    res.json({ notice, question, study, community });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { handleRecentPost };
