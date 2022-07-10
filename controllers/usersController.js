const asyncHandler = require("express-async-handler");

// @desc Get users
// @route  GET /api/users
// @access private

const getUsers = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "get Success" });
});

// @desc Create a user
// @route  POST /api/users
// @access private

const createUser = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    throw new Error("Name is required");
  } else {
    res.status(200).json({ success: `successs -->${req.body.name}` });
  }
});

// @desc Update a user
// @route  UPDATE /api/users/:id
// @access private

const updateUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update user Success ${req.params.id}` });
});

// @desc Delete a user
// @route  Delete /api/users/:id
// @access private

const deleteUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete user Success ${req.params.id}` });
});

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
