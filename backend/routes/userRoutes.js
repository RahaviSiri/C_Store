const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateJWT = require('../middlewares/authMiddleware');

// Define routes for users
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/authentication', authenticateJWT);

module.exports = router;

//outer.post(): These lines define two POST routes:

// /signup: This route is triggered when a POST request is made to /signup. It calls the signup method from the userController.
// /login: Similarly, this route is triggered when a POST request is made to /login, and it calls the login method from the userController.

