// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const verifyToken = require('../middleware/auth');
router.post('/', verifyToken, orderController.createOrder);
router.put('/:id', verifyToken, orderController.finishOrder);
router.delete('/:id', verifyToken, orderController.cancelOrder);
router.get('/', verifyToken, orderController.getAllOrders);
router.get('/:id', verifyToken, orderController.getOrderById);
module.exports = router;
