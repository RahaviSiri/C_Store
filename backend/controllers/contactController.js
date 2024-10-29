const contactService = require('../services/contactService');

exports.contactUs = async (req, res) => {
  try {
    const { token ,subject, message } = req.body;
    const id = await userService.getUserID(token);
    // Pass the correct parameters to the contactUs function
    const contactResponse = await contactService.contact({ id, subject, message });
    console.log(contactResponse); // Check response for debugging
    res.status(200).json({ message: contactResponse });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message', error: error.message });
  }
};
