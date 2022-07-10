const express = require("express");
const router = express.Router();
const {
  createPost,
  updatePost,
  getPosts,
  deletePost,
} = require("../controllers/postController");

const protect = require("../middleware/authMiddleware");

router.route("/").get(protect, getPosts).post(protect, createPost);
router.route("/:id").put(protect, updatePost).delete(protect, deletePost);

module.exports = router;
