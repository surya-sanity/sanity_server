const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Users = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await Users.findById(decoded.id).select("-password");

      next();
    } catch (err) {
      console.log("Auth middle ware error --> ", err);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, No token");
  }
});

module.exports = protect;
