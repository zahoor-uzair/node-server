const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// routes
const authRoutes = require('./routes/login');
const signUpRoutes = require('./routes/signup');
const protectedRoutes = require('./routes/protected');
const products = require('./routes/products');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(helmet());

// Set up rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Secure Node API',
        version: '1.0.0',
        description: 'API documentation for Secure Node API',
      },
    },
    apis: ['./routes/*.js'], // Update with the correct path to your API route files
  };
  
  const specs = swaggerJsdoc(options);


// Routes
app.use('/login', authRoutes);
app.use('/signup', signUpRoutes);
app.use('/protected', protectedRoutes);
app.use('/products', products)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
// Start the server
app.listen(3005, () => {
  console.log('Server listening on port 3005');
});
