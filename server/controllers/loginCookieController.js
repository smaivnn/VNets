const User = require("../model/User");
const jwt = require("jsonwebtoken");

const handlePageRefresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  //find the exact user with exact rT
  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) {
    return res.sendStatus(401);
  }

  if (foundUser.refreshToken === refreshToken) {
    // get User roles
    const roles = Object.values(foundUser.USER_ROLES);
    const profile = Object.values(foundUser.USER_PROFILE);

    // create JWTs access token
    // sign(payload : information to post in token, secretOrPrivateKey, [option,callback])
    const accessToken = jwt.sign(
      {
        UserInfo: {
          USER_ID: foundUser.USER_ID,
          USER_NICKNAME: foundUser.USER_NICKNAME,
          USER_studentID: foundUser.USER_studentID,
          roles: roles,
          USER_PROFILE: profile,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );

    return res.json({ login: "success", accessToken, roles });
  }
  return res.json({ login: "fail" });
};

module.exports = { handlePageRefresh };
