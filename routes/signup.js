const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();
const secretKey = process.env.SECRET_KEY;

const user=[]

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User sign-up
 *     description: Registers a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful sign-up
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Bad request
 */

// Middleware to validate sign-up request
function validateSignUpRequest(req, res, next) {
  const { username, email, password, confirmPassword } = req.body;

  // Check if all fields are provided
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check if the password and confirm password match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  // Continue to the next middleware if validation passes
  next();
}

router.post('/', validateSignUpRequest, (req, res) => {
  const { username, email, password } = req.body;

  // Check if the user already exists in the database
  // You can add your own logic to check if the username or email is already taken

  // Generate a salt and hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Create a new user in the database with the provided details
    const newUser = {
      username,
      email,
      password: hashedPassword,
    };
    
    user.push(newUser)
    // Generate JWT token for the newly created user
    const token = jwt.sign({ userId: newUser.id }, secretKey, { expiresIn: '2h' });

    res.json({ token });
  });
});

module.exports = router;
