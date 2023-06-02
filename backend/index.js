const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRouter = require("./routes/User.router");
const messageRouter = require("./routes/Message.router");
const connection = require("./config/db");
const authenticate = require("./middlewares/Auth.middleware");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/user", userRouter);
app.use(authenticate)
app.use("/message", messageRouter);

// Start the server
app.listen(port, async() => {
    try {
        await connection;
        console.log('Connected to DB');
    } catch (error) {
        console.log('Cannot connect to DB:', error);
    }
  console.log(`Server is running on: http://localhost:${port}`);
});


