const asyncHandler = require("express-async-handler");
const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @desc User Login
// @route  POST /api/users/login
// @access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

// @desc Get Current user Data
// @route  GET /api/users/current
// @access public

const getCurrentUser = asyncHandler(async (req, res) => {
  const { _id, name, email } = await Users.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

// @desc Get users
// @route  GET /api/users
// @access private

const getUsers = asyncHandler(async (req, res) => {
  const users = await Users.find();

  res.status(200).send(users);
});

// @desc Create a user
// @route  POST /api/users
// @access public

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.statusCode(400);
    throw new Error("Please fill in all fields");
  }

  const userExists = await Users.findOne({ email });

  if (userExists) {
    res.statusCode(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await Users.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
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
    res.statusCode(400);
    throw new Error(`User with id = ${id} not found`);
  }

  user.remove();

  res.status(200).json({ id });
});

//Generate token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getCurrentUser,
  loginUser,
};
