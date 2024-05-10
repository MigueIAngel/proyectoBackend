// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// POST request to create a new order
router.post('/', orderController.createOrder);

// GET request to retrieve all orders
router.get('/', orderController.getAllOrders);

// GET request to retrieve an order by ID
router.get('/:id', orderController.getOrderById);

// PUT request to update an order (status change only)
router.put('/:id', orderController.updateOrder);

// DELETE request to delete an order
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
