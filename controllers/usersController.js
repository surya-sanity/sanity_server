const asyncHandler = require("express-async-handler");
const Users = require("../models/userModel");

// @desc Get users
// @route  GET /api/users
// @access private

const getUsers = asyncHandler(async (req, res) => {
  const users = await Users.find();

  res.status(200).send(users);
});

// @desc Create a user
// @route  POST /api/users
// @access private

const createUser = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.statusCode(400);
    throw new Error("User cannot be empty");
  }
  const user = await Users.create(req.body);
  res.status(200).json(user);
});

// @desc Update a user
// @route  UPDATE /api/users/:id
// @access private

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await Users.findById(id);

  if (!id || !req.body) {
    res.statusCode(400);
    throw new Error("id and updated user is required to update user");
  }

  if (!user) {
    res.statusCode(400);
    throw new Error(`User with id = ${id} not found`);
  }

  const updatedUser = await Users.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(updatedUser);
});

// @desc Delete a user
// @route  Delete /api/users/:id
// @access private

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await Users.findById(id);

  if (!user) {
    throw new Error(`User with id = ${id} not found`);
  }

  user.remove();

  res.status(200).json({ id });
});

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
