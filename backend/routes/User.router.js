const express = require("express");
const userRouter = express.Router();

const { registerUser, loginUser } = require("../controllers/User.controller");

// Register a new user
userRouter.post("/register", registerUser);

// Login user
userRouter.post("/login", loginUser);

module.exports = userRouter;