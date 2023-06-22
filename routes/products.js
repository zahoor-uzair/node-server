const express = require('express');
const products = require('../items')
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoints for products
 */

/**
 * @swagger
 * /products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get all products
 *     description: Retrieves a list of all products
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *     security:
 *       - bearerAuth: []
 */
router.get('/', (req, res) => {
  // Accessible only with a valid token
  res.json({  products });
});

module.exports = router;
