const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
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
