const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  // use cookies on browser
  const cookies = req.cookies;
  console.log(`cookie available at login : ${JSON.stringify(cookies)}`);
  // both of ID & pwd are needed
  console.log("BP", req.body);
  const { USER_ID, USER_PASSWORD } = req.body;
  if (!USER_ID || !USER_PASSWORD)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  // checking matched user on DB
  const foundUser = await User.findOne({ USER_ID: USER_ID }).exec();
  console.log(foundUser);
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
    const newRefreshToken = jwt.sign(
      { USER_ID: foundUser.USER_ID },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "15m" } //1h or 1d로 바꾸기
    );

    /* 
    this code is for multiple login function.
      만약 쿠키에 jwt가 없다면 -> return undefined, ! 로 true 변환, rt가져옴.
      
      만약 쿠키에 jwt가 있다면 => return true, ! 로 undefined/flase 변환, 
      현재 값과 다른 rt를 가져옴.(array에서)
    */

    let newRefreshTokenArray = !cookies?.jwt
      ? foundUser.refreshToken
      : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);

    if (cookies?.jwt) {
      /* 
        Scenario added here: 
            1) User logs in but never uses RT and does not logout 
            2) RT is stolen
            3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
        */
      const refreshToken = cookies.jwt;
      const foundToken = await User.findOne({ refreshToken }).exec();

      // Detected refresh token reuse!
      if (!foundToken) {
        console.log("attempted refresh token reuse at login!");
        // clear out ALL previous refresh tokens
        newRefreshTokenArray = [];
      }

      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
    }

    // Saving refreshToken with current user(support multple login)
    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    const result = await foundUser.save();
    console.log(result);

    // Create Secure Cookie with refreshToken
    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000, // 86400초(하루)
      secure: true,
    }); //secure: true,

    // Send access token to user
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
