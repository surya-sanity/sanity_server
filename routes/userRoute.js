const express = require("express");
const router = express.Router();
const {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  getCurrentUser,
  loginUser,
} = require("../controllers/usersController");
const protect = require("../middleware/authMiddleware");

router.route("/").get(getUsers).post(createUser);
router.route("/:id").put(updateUser).delete(deleteUser);
router.route("/login").post(loginUser);
router.get("/current", protect, getCurrentUser);

module.exports = router;
