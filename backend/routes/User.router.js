const express = require("express");
const userRouter = express.Router();

const { registerUser, loginUser, getUser } = require("../controllers/User.controller");

// Register a new user
userRouter.post("/register", registerUser);

// Login user
userRouter.post("/login", loginUser);

// get all users
userRouter.get('/', getUser)

module.exports = userRouter;