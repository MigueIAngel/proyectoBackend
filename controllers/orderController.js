// controllers/orderController.js
const Order = require('../models/order');

exports.createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create({ ...req.body, user: req.user });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error creating order', error });
  }
};

// controllers/orderController.js
exports.getAllOrders = async (req, res) => {
  try {
    const { startDate, endDate, status } = req.query;
    let queryObj = {};

    if (status) {
      queryObj.status = status;
    }
    if (startDate || endDate) {
      queryObj.orderDate = {};
      if (startDate) {
        queryObj.orderDate.$gte = new Date(startDate);
      }
      if (endDate) {
        queryObj.orderDate.$lte = new Date(endDate);
      }
    }

    const orders = await Order.find(queryObj).populate('books.book');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders', error });
  }
};


exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: 'Order not found', error });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error updating order', error });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error });
  }
};
