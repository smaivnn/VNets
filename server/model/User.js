const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  USER_ID: {
    type: String,
    required: true,
  },
  USER_PASSWORD: {
    type: String,
    required: true,
  },

  USER_NAME: {
    type: String,
    required: true,
  },
  USER_NICKNAME: {
    type: String,
    required: true,
  },
  USER_studentID: {
    type: Number,
    required: true,
  },
  USER_ROLES: {
    Guest: {
      type: Number,
      default: 2001,
    },
    User: Number,
    Admin: Number,
  },

  refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
