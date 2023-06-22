const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const router = express.Router();
const secretKey = process.env.SECRET_KEY;
console.log("from auth file")
const users = [
  { id: 1, username: 'user1', password: '$2b$10$dTPS/ftKFLgY8sBo8jy3W.s5m8.pW.D/GhyR8gBnANeKdTVVEdmMq' }, // password: password1
  { id: 2, username: 'user2', password: '$2b$10$L0nn7jOQkl2HjtnI6nR8sePG0K6r8c5LeQ4Z4xOmJPhuam4uyLdE2' }, // password: password2
];

router.post('/', (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)

  // Find user by username
  const user = users.find((user) => user.username === username);

  // User not found or invalid password
  if (!user || !bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '2h' });

  // Return the token
  res.json({ token });
});

module.exports = router;
