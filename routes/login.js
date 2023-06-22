const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();
const secretKey = process.env.SECRET_KEY;

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */

/**
 * @swagger
 * /auth:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User login
 *     description: Logs in a user and returns a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid username or password
 */

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
