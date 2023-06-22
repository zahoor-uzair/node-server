// Dependencie:  npm install express body-parser bcrypt jsonwebtoken express-rate-limit helmet
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(helmet());

// Set up rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Secret key for JWT
const secretKey = 'your-secret-key';

// In-memory user database (replace with your database implementation)
const users = [
  { id: 1, username: 'user1', password: '$2b$10$dTPS/ftKFLgY8sBo8jy3W.s5m8.pW.D/GhyR8gBnANeKdTVVEdmMq' }, // password: password1
  { id: 2, username: 'user2', password: '$2b$10$L0nn7jOQkl2HjtnI6nR8sePG0K6r8c5LeQ4Z4xOmJPhuam4uyLdE2' }, // password: password2 $2b$10$L0nn7jOQkl2HjtnI6nR8sePG0K6r8c5LeQ4Z4xOmJPhuam4uyLdE2
];

// Authentication route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)

  // Find user by username
  const user = users.find((user) => user.username === username);
  console.log(user)
  // User not found or invalid password
  if (!user || !bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '2h' });

  // Return the token
  res.json({ token });
});

// Protected route example
app.get('/protected', authenticateToken, (req, res) => {
  // Accessible only with a valid token
  res.json({ message: 'Protected route accessed successfully' });
});

// Token authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    req.userId = decoded.userId;
    next();
  });
}

// Start the server
app.listen(3005, () => {
  console.log('Server listening on port 3005');
});
