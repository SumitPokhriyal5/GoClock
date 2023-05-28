const jwt = require("jsonwebtoken");
require("dotenv").config();

// authentication for user verification
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  // check if token is available or not
  if (token) {

    // decode the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (decoded) {
        // add userID to body
      const userID = decoded.userID;
      req.body.userID = userID;
      req.body.address = decoded.address;
      next();
    } else {
      res.send("Please Login First");
    }
  } else {
    res.send("Please Login First");
  }
};

module.exports = authenticate;
