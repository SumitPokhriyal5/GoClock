const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User.model");

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, password, address, role } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUND));

    // Create a new user
    const user = new User({
      username,
      password: hashedPassword,
      address,
      role,
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user", error });
  }
};

// Login user
exports.loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: "User does not exist" });
      }
  
      // Compare the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Wrong Password!" });
      }
  
      // Generate a JSON Web Token (JWT)
      const token = jwt.sign({ userID: user._id , address: user.address }, process.env.SECRET_KEY);
  
      res.status(200).json({ token , user});
    } catch (error) {
      res.status(500).json({ message: "Failed to login", error });
    }
  };

  exports.getUser = async (req , res) => {
    try {
      const allUsers = await User.find();
      res.status(200).json({ allUsers })
    } catch (error) {
      res.status(500).json({error})
    }
  }
