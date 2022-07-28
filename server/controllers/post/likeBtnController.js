const Post = require("../../model/Post");

//Toggle : 만약 이름이 배열에 없으면 추가하고 Count를 증가.
// 만약 이름이 배열에 있으면 제거하고 Count를 감소
const handleLikeBtnClicked = async (req, res) => {
  const { USER_ID, POST_ID } = req.body;
  if (!USER_ID) {
    return res.status(400).json({ message: "No User Login" });
  }

  const foundPost = await Post.findOne({ POST_ID }).exec();

  if (foundPost.VISIBLE === false) {
    return res.sendStatus(401);
  }

  let likeUserListArray = foundPost.LIKE.user;
  const checkUserNameIncludes = foundPost.LIKE.user.includes(USER_ID);
  try {
    if (checkUserNameIncludes) {
      likeUserListArray = foundPost.LIKE.user.filter(
        (element) => element !== USER_ID
      );
      foundPost.LIKE.user = likeUserListArray;
    } else {
      foundPost.LIKE.user = [...likeUserListArray, USER_ID];
    }
  } catch (error) {
    console.log(error);
  }

  foundPost.LIKE.count = foundPost.LIKE.user.length;
  foundPost.save();
  res.json(foundPost.LIKE.count);
};

module.exports = { handleLikeBtnClicked };
