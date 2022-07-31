const User = require("../../model/User");

const handleEditUserProfile = async (req, res) => {
  const { USER_ID, USER_NICKNAME, USER_PROFILE } = req.body;
  if (!USER_ID)
    return res.status(400).json({ message: "StudentId are required" });

  try {
    const foundUser = await User.findOne({ USER_ID }).exec();
    if (!foundUser) {
      return res.sendStatus(401);
    }

    foundUser.USER_NICKNAME = USER_NICKNAME;
    foundUser.USER_PROFILE = USER_PROFILE;
    foundUser.save();
    res.json({ USER_NICKNAME, USER_PROFILE });
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
};

module.exports = { handleEditUserProfile };
