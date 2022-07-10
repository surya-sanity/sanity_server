const asyncHandler = require("express-async-handler");
const Posts = require("../models/postModel");

// @desc Get posts
// @route  GET /api/posts
// @access private

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Posts.find();

  res.status(200).send(posts);
});

// @desc Create a post
// @route  POST /api/posts
// @access private

const createPost = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.statusCode(400);
    throw new Error("Post cannot be empty");
  }
  const post = await Posts.create(req.body);
  res.status(200).json(post);
});

// @desc Update a post
// @route  UPDATE /api/posts/:id
// @access private

const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { description, imageUrl, likes, comments } = req.body;
  const post = await Posts.findById(id);

  if (!id || !req.body) {
    res.statusCode(400);
    throw new Error("id and updated post is required to update post");
  }

  if (!post) {
    res.statusCode(400);
    throw new Error(`Post with id = ${id} not found`);
  }

  const postToUpdate = await Posts.findById(id);

  Object.assign(postToUpdate, req.body);

  if (comments) {
    postToUpdate.comments.push(comments);
  }
  await postToUpdate.save();

  res.status(200).json(postToUpdate);
});

// @desc Delete a post
// @route  Delete /api/posts/:id
// @access private

const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Posts.findById(id);

  if (!post) {
    res.statusCode(400);
    throw new Error(`Post with id = ${id} not found`);
  }

  post.remove();

  res.status(200).json({ id });
});

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
};
