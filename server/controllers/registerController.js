const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { USER_ID, USER_PASSWORD, USER_NAME, USER_studentID } = req.body;
  if ((!USER_ID || !USER_PASSWORD || !USER_NAME, !USER_studentID))
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  //duplicate : 복제하다.
  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ USER_ID: USER_ID }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(USER_PASSWORD, 10);

    //create and store the new user with hashedPassword
    const result = await User.create({
      USER_ID: USER_ID,
      USER_PASSWORD: hashedPwd,
      USER_NAME: USER_NAME,
      USER_studentID: USER_studentID,
    });
    console.log("New user", result);

    res
      .status(201)
      .json({
        success: `New user ID : ${USER_ID}, NAME : ${USER_NAME} created!`,
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
