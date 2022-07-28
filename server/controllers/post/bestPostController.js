const Post = require("../../model/Post");

const handleBestPost = async (req, res) => {
  try {
    const bestPost = await Post.find({
      VISIBLE: true,

      "LIKE.count": {
        $gte: 1,
      },
    })
      .sort({ count: 1 })
      .limit(10);

    res.send(bestPost);

    // res.json({ notice, question, study, community });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { handleBestPost };
