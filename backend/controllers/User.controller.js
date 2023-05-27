const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User.model");

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUND));

    // Create a new user
    const user = new User({
      email,
      password: hashedPassword,
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
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Failed to login", error });
    }
  };
