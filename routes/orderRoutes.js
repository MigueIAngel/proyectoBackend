// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const verifyToken = require('../middleware/auth');
router.post('/', verifyToken, orderController.createOrder);
router.put('/:id', verifyToken, orderController.updateOrder);
router.delete('/:id', verifyToken, orderController.deleteOrder);

module.exports = router;
