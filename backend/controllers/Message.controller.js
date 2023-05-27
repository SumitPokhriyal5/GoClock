const Message = require("../models/Message.model");

// Create a new message
exports.createMessage = async (req, res) => {
  try {
    const { orderID, to, from, quantity, address, transporter } = req.body;

    const message = new Message({
      orderID,
      to,
      from,
      quantity,
      address,
      transporter,
    });

    // Save the message to the database
    await message.save();

    res.status(201).json({ message: "Message created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create message", error });
  }
};

// Get all messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find();

    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ message: "Failed to get messages", error });
  }
};

// Send a message
exports.sendMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    const { price } = req.body;

    // Find the message by ID
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Update the message with the price and mark it as sent
    message.price = price;
    message.sent = true;

    // Save the updated message to the database
    await message.save();

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send message", error });
  }
};
