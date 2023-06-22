const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const secretKey = process.env.SECRET_KEY;


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

/**
 * @swagger
 * tags:
 *   name: Protected
 *   description: API endpoints that require authentication
 */

/**
 * @swagger
 * /protected:
 *   get:
 *     tags:
 *       - Protected
 *     summary: Access protected route
 *     description: Accessible only with a valid JWT token
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Missing or invalid token
 */
router.get('/', authenticateToken, (req, res) => {
  // Accessible only with a valid token
  res.json({ message: 'Protected route accessed successfully' });
});

module.exports = router;







