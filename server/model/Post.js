const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  WRITER: {
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
  RECOMMENDED: {
    tpye: Number,
    default: 0,
  },
  DATE: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Post", postSchema);
