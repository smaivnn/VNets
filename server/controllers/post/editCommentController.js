const Post = require("../../model/Post");

/*
  - 배열 내에서 매치되는 것 찾기.
  - use ID, DATE -> 중복문제 가능하나 낮음.
  - 찾은 후 해당 내용 수정 ?
*/
const handleEditComment = async (req, res) => {
  const { USER_ID, DATE, COMMENT, POST_ID } = req.body;

  if (!USER_ID || !DATE || !POST_ID)
    return res
      .status(400)
      .json({ message: "NO POST_ID, USER_ID, DATE in req" });

  const foundPost = await Post.findOne({ POST_ID }).exec();
  if (!foundPost) {
    return res.sendStatus(401);
  }

  try {
    foundPost.COMMENT.map((comment, idx) => {
      if (comment.USER_ID === USER_ID && comment.DATE === DATE) {
        comment.COMMENT = COMMENT;
      }
    });

    // '' 일때 안됐는데 왜 갑자기 되는지 모름
    // 갑자기 ''도됨 왜지
    foundPost.markModified("COMMENT");
    foundPost.save();
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
};

module.exports = { handleEditComment };
