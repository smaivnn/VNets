const User = require("../../model/User");

const hanldeDoubleCheck = async (req, res) => {
  const { USER_ID } = req.query;
  const doubleCheck = await User.findOne({ USER_ID }).exec();
  if (doubleCheck)
    return res.json({
      doubleCheck: false,
      message: "There are duplicate IDs.",
    });

  return res.json({ doubleCheck: true, message: "User ID is available." });
};

module.exports = { hanldeDoubleCheck };
