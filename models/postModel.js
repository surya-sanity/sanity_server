const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [[String]],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
