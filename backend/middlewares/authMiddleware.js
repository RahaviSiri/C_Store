const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

// Middleware to check if the user is authenticated
const authenticateJWT = (req, res, next) => {
  const token = req.body.authorization;
  console.log("Token received:", token);  // Debugging log

  if (!token) {
    return res.status(403).json({ message: 'Access forbidden' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    if(!userService.checkIfUserExists(user.email)){
      return res.status(404).json({ message: 'Invalid token, user not found!' });
    }
  });
};

module.exports = authenticateJWT;

// The code defines a middleware function called authenticateJWT that checks whether a request contains a valid JWT (JSON Web Token), ensuring that only authenticated users can access certain routes or resources.