const express = require("express");
const router = express.Router();
const {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} = require("../controllers/usersController");

router.route("/").get(getUsers).post(createUser);
router.route("/:id").put(updateUser).delete(deleteUser);

module.exports = router;
