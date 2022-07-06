const User = require("../model/User");

const handlePageRefresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  //find the exact user with exact rT
  const foundUser = await User.findOne({ refreshToken }).exec();

  if (foundUser.refreshToken === refreshToken) {
    return res.json({ login: "success" });
  }
  return res.json({ login: "fail" });
};

module.exports = { handlePageRefresh };
