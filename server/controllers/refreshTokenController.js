const User = require("../model/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies; //use cookies on browser
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

  //find the exact user with exact rT
  const foundUser = await User.findOne({ refreshToken }).exec();

  // Detected refreshToken reuse!
  if (!foundUser) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.sendStatus(403); //Forbidden
        console.log("attempted refresh token reuse!");
        const hackedUser = await User.findOne({
          username: decoded.username,
        }).exec();
        hackedUser.refreshToken = [];
        const result = await hackedUser.save();
        console.log(result);
      }
    );
    return res.sendStatus(403); //Forbidden
  }

  // 결국 이 컨트롤러는 새로운 토큰을 주는 것이니까.
  // 지금 접속한 곳에서 생성된 토큰을 제외한 토큰들을 모아두는 함수를 만들고.
  // 아래(verify)에서 새로 발급한다.
  const newRefreshTokenArray = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );

  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      //if DB.rT expires,
      if (err) {
        console.log("expried refresh token");
        foundUser.refreshToken = [...newRefreshTokenArray];
        const result = await foundUser.save();
        console.log(result);
      }
      if (err || foundUser.username !== decoded.username)
        return res.sendStatus(403);

      // RefreshToken was still valid
      const roles = Object.values(foundUser.roles);
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: decoded.username,
            roles: roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10s" }
      );

      const newRefreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "15s" } //1h or 1d로 바꾸기
      );
      // Saving refreshToken with current user
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      const result = await foundUser.save();

      // Create Secure Cookie with refreshToken
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
      }); //secure: true,

      res.json({ accessToken });
    }
  );
};

module.exports = { handleRefreshToken };
