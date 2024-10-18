const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Signup logic: create a new user and hash the password
exports.signup = async (firstname, lastname, email, password) => {

  // If a user with the email already exists, return an error message
  if (await this.checkIfUserExists(email)) {
    throw new Error('User123 with this email already exists');
  }
  else{
  
  // If no user exists, proceed to hash the password and insert new user
  // bcrypt.hash(password, 10) hashes the user's password with a salt value of 10. This makes the password more secure by introducing randomness (the "salt").
  const hashedPassword = await bcrypt.hash(password, 10);
  const sqlInsert = 'INSERT INTO registered_customer (first_name, last_name, email, password_hash, address_id, phone_number) VALUES (?, ?, ?, ?, ?, ?)';
  await db.execute(sqlInsert, [firstname, lastname, email, hashedPassword, 1, 123456789]);

  // Retrieve the newly inserted user to generate a JWT token
  const sqlRetrieve = 'SELECT * FROM registered_customer WHERE email = ?';
  const [user] = await db.execute(sqlRetrieve, [email]);

  // Generate JWT token for the newly registered user
  const token = jwt.sign({ id: user[0].customer_id, email: user[0].email }, process.env.JWT_SECRET, { expiresIn: '24h' });

  return token;
  }
};

// Login logic: authenticate a user
exports.login = async (email, password) => {
  
  const sql = 'SELECT * FROM registered_customer WHERE email = ?';
  const [user] = await db.execute(sql, [email]);

  if (!user[0]) throw new Error('User not found');
  
  const passwordMatch = await bcrypt.compare(password, user[0].password_hash);
  if (!passwordMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user[0].id, email: user[0].email }, process.env.JWT_SECRET, { expiresIn: '24h' });
  return token;
};


exports.checkIfUserExists = async (email) => {
  
  // The function checks if the user exists by running a SELECT query on the registered_customer table with the provided email.
  const sql = 'SELECT * FROM registered_customer WHERE email = ?';
  const [user] = await db.execute(sql, [email]);
  
  if (user.length > 0) return true;
  else return false;
  
};


// bcrypt: Used to securely hash passwords. It prevents storing plain-text passwords in the database by using one-way encryption (hashing).


// **---- Why this Tokens ----**

// Authentication: When a user successfully signs up or logs in, a token is generated and sent to the client (browser or mobile app). This token contains information about the user, such as their ID and email. The client stores this token (usually in local storage or a cookie) and sends it with every request to protected routes on the server.

// Authorization: Once the token is attached to requests, the server can verify whether the request is coming from an authenticated user by checking the validity of the token. If the token is valid, the server allows access to certain resources or actions.

// **---- Why need this Tokens ----**

// Without Tokens: Traditional systems often use session-based authentication. When a user logs in, the server creates a session for the user and stores it in memory or a database. The server also sends a session ID to the client, which must be sent back with each request. The server then looks up the session to identify the user. This requires server-side storage for each user session, which can become resource-intensive as the application scales.

// With Tokens: In contrast, JWT-based authentication is stateless. The token contains all the information the server needs to authenticate the user, so the server doesn't need to store user sessions. This makes the system more scalable because the server doesn't have to manage session storage.


// jwt.sign(payload, secretOrPrivateKey, options)
// The jwt.sign() method is used to create or sign a new JWT token. It takes three main arguments:

// Payload: The data (claims) you want to include in the token.
// Secret or Private Key: A secret key used to sign and verify the token, ensuring its authenticity.
// Options: Additional settings like token expiration.
//const token = jwt.sign({ id: user[0].id, email: user[0].email }, 'hi123', { expiresIn: '24h' });

