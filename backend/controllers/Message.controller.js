const Message = require("../models/Message.model");

// Create a new message
exports.createMessage = async (req, res) => {
  try {
    const {userID, to, from, quantity, address, transporter } = req.body;

    // function for generating random string
    function generateRandomString() {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const numbers = '0123456789';
    
      let result = '';
    
      // Generate the first three characters (alphabets)
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        result += alphabet.charAt(randomIndex);
      }
    
      // Generate the next two characters (numbers)
      for (let i = 0; i < 2; i++) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        result += numbers.charAt(randomIndex);
      }
    
      return result;
    }
    
    // Example usage
    const randomString = generateRandomString();    

    const message = new Message({
      userID,
      orderID: randomString,
      to,
      from,
      quantity,
      address,
      transporter,
      sent: false
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
