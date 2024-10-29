const contactService = require('../services/contactService');
const userService = require("../services/userService");

exports.contactUs = async (req, res) => {
  const authHeader = req.headers.authorization;
  console.log('Authorization Header:', authHeader);
  const token = authHeader && authHeader.split(' ')[1]; 
  console.log('Authorization Header:', token);
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const { subject, message } = req.body;
    const id = await userService.getUserID(token);
    // Pass the correct parameters to the contactUs function
    const contactResponse = await contactService.contact({ id, subject, message });
    console.log(contactResponse); // Check response for debugging
    res.status(200).json({ message: contactResponse });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message', error: error.message });
  }
};
