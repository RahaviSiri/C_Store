const userService = require('../services/userService');

// Controller function for user signup
exports.signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const token = await userService.signup(firstname, lastname, email, password);
    res.status(201).json({ message: 'User created', token });
    //res.send(token);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Controller function for user login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userService.login(email, password);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials', error: error.message });
  }
};

exports.changeUserInfo = async (req, res) => {
  try {
    const {token, firstName, lastName, streetAddress, city, state, zipCode, phoneNumber} = req.body;
    const id = await userService.getUserID(token);
    //console.log(id);
    await userService.updateUserInfo(id, firstName, lastName, streetAddress, city, state, zipCode, phoneNumber);
    res.status(200).json({ message: 'Info Update Successful'});
  } catch (error) {
    res.status(401).json({ message: 'Failed to Update User Info', error: error.message });
  }
}

exports.getUserInfo = async (req, res) => {
  try {
    const token = req.body.token;
    console.log(token);
    const id = await userService.getUserID(token);
    //console.log(id);
    const [userInfo] = await userService.getUserInfo(id);
    res.status(201).json({message: 'User Info Fetched', userInfo});
  } catch (error) {
    res.status(401).json({ message: 'Failed to Fetch User Info', error: error.message });
  }
}

// Destructuring req.body:

// const { firstname, lastname, email, password } = req.body;
// This extracts the incoming data (first name, last name, email, password) from the request body (req.body) sent by the client (usually from a form or API request). 
// Calling userService.signup:
// The userService.signup method is called, passing the extracted data. This function handles the actual user registration process (e.g., hashing the password, saving the user to the database, and generating a JWT).

// If the signup process is successful, the server sends a response with a 201 status code (Created) and a JSON object containing a success message and the token.
// The token is returned to the client so that it can be used for authentication in future requests.this means that after a user successfully signs up or logs in, the server generates a JWT token (which contains encoded user information) and sends it back to the client (browser, mobile app, etc.).

// {
//   "message": "Login successful",
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsImlhdCI6MTYxNjQ0Nzg2NiwiZXhwIjoxNjE2NTM0MjY2fQ.qo2J74C2G5yQV-2t5quGQ_fkbqKhJb87kDi93dMEtA0"
// }
