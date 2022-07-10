const express = require("express");
const router = express.Router();
const {
  createPost,
  updatePost,
  getPosts,
  deletePost,
} = require("../controllers/postController");

router.route("/").get(getPosts).post(createPost);
router.route("/:id").put(updatePost).delete(deletePost);

module.exports = router;
