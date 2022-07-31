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
  USER_PROFILE: {
    Tag1: {
      type: String,
      default: "Tag1",
    },
    Tag2: {
      type: String,
      default: "Tag2",
    },
    Tag3: {
      type: String,
      default: "Tag3",
    },
    Tag4: {
      type: String,
      default: "Tag4",
    },
    Link1: {
      type: String,
      default: "Link1",
    },
    Link2: {
      type: String,
      default: "Link2",
    },
    Comment: {
      type: String,
      default: "Comment limit eng 55, kor 30 characters.",
    },
  },

  refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
