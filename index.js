const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
// routes
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

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

// Routes
app.use('/login', authRoutes);
app.use('/protected', protectedRoutes);

// Start the server
app.listen(3005, () => {
  console.log('Server listening on port 3005');
});
