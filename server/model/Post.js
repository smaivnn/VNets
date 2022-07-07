const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  USER_ID: {
    type: String,
    required: true,
  },
  USER_NICKNAME: {
    type: String,
    required: true,
  },
  TITLE: {
    type: String,
    required: true,
  },
  CLASSIFICATION: {
    type: String,
    required: true,
  },
  DESCRIPTION: {
    type: String,
    required: true,
  },
  HITS: {
    tpye: Number,
    default: 0,
  },
  LIKE: {
    tpye: Number,
    default: 0,
  },
  DATE: {
    type: String,
  },
});

module.exports = mongoose.model("Post", postSchema);
