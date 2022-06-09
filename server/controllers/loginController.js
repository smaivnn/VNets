const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  // both of ID & pwd are needed
  // console.log("BP", req.body); ///////////////////////////////////////////////////
  const { USER_ID, USER_PASSWORD } = req.body;
  if (!USER_ID || !USER_PASSWORD)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  // checking matched user on DB
  const foundUser = await User.findOne({ USER_ID: USER_ID }).exec();
  // console.log("FOUNDUSER", foundUser); ///////////////////////////////////////////////////
  // if unmatched, Unauthorized
  if (!foundUser) {
    return res.sendStatus(401);
  }

  // compare(evaluate) password
  const match = await bcrypt.compare(USER_PASSWORD, foundUser.USER_PASSWORD);
  if (match) {
    // get User roles
    const roles = Object.values(foundUser.USER_ROLES);

    // create JWTs access token
    // sign(payload : information to post in token, secretOrPrivateKey, [option,callback])
    const accessToken = jwt.sign(
      {
        UserInfo: {
          USER_ID: foundUser.USER_ID,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );

    // create JWTs refresh token
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "15s" } //1h or 1d로 바꾸기
    );

    // Saving refreshToken with current user(support multple login)
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log("LC_RESULT", result); ///////////////////////////////////////////////////

    // Create Secure Cookie with refreshToken
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000, // 86400초(하루)
      secure: true,
    }); //secure: true,

    // Send access token to user
    res.json({ accessToken, roles });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
