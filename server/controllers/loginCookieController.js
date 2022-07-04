const User = require("../model/User");

const handlePageRefresh = async (req, res) => {
  console.log(req.cookies);
  const cookies = req.cookies;
  console.log("this is checking", cookies);
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  //find the exact user with exact rT
  const foundUser = await User.findOne({ refreshToken }).exec();

  if (foundUser.refreshToken === refreshToken) {
    res.json({ login: success });
  }
  res.json({ login: fail });
};

module.exports = { handlePageRefresh };
