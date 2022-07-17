const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

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
    type: Date,
    default: Date.now,
  },
  POST_ID: {
    type: Number,
  },
});

postSchema.plugin(autoIncrement.plugin, {
  model: "Post",
  field: "POST_ID",
  startAt: 1,
  increment: 1,
});
module.exports = mongoose.model("Post", postSchema);
