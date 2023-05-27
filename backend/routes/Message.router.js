const express = require("express");
const messageRouter = express.Router();

const { createMessage, getMessages, sendMessage } = require("../controllers/Message.controller");

// Create a new message
messageRouter.post("/", createMessage);

// Get all messages
messageRouter.get("/", getMessages);

// Send a message
messageRouter.post("/send/:id", sendMessage);

module.exports = messageRouter;