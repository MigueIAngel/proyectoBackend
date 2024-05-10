// controllers/orderController.js
const Order = require('../models/order');
const Book = require('../models/book');
exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order({
      books: req.body.books.map(book => ({
        book: book.book
      })),
      user: req.user.id,
      status: 'in progress'
    });

    // Check if any of the books in the order are already owned by the authenticated user
    const booksInOrder = newOrder.books.map(book => book.book);
    const userBooksCount = await Book.countDocuments({ _id: { $in: booksInOrder }, author: req.user.id });
    if (userBooksCount > 0) {
      return res.status(400).json({ message: 'One or more books already belong to the authenticated user' });
    }

    // Check if any of the books in the order are in another order in progress
    const ordersInProgress = await Order.find({ status: 'in progress', 'books.book': { $in: booksInOrder } });
    if (ordersInProgress.length > 0) {
      return res.status(400).json({ message: 'One or more books are already in another order in progress' });
    }

    // Check if any of the books in the order have been deleted
    const deletedBooks = await Book.find({ _id: { $in: booksInOrder }, deleted: true });
    if (deletedBooks.length > 0) {
      return res.status(400).json({ message: 'One or more books in the order have been deleted' });
    }

    if (req.body.status === "completed") {
      // Soft delete the book associated with the order
      await Book.findByIdAndUpdate(newOrder.book, { deleted: true });
    }

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error creating order', error });
  }
};

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

    // Only retrieve orders for the authenticated user
    queryObj.user = req.user.id;

    const orders = await Order.find(queryObj).populate('books.book');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders', error });
  }
};


exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order.user.toString() === req.user.id) {
      res.status(200).json(order);
    } else {
      res.status(403).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(404).json({ message: 'Order not found', error });
  }
};

exports.finishOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order.status === 'in progress' && order.user.toString() === req.user.id) {
      await Order.findByIdAndUpdate(req.params.id, { status: 'completed', completionDate: Date.now() });

      // Soft delete the books associated with the order
      const bookIds = order.books.map(book => book.book);
      await Book.updateMany({ _id: { $in: bookIds } }, { deleted: true });

      res.status(200).json({ message: 'Order completed' });
    } else {
      res.status(400).json({ message: 'Order cannot be completed' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error completing order', error });
  }
}

  exports.cancelOrder = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (order.status === 'in progress' && order.user.toString() === req.user.id) {
        await Order.findByIdAndUpdate(req.params.id, { status: 'cancelled' });
        res.status(200).json({ message: 'Order cancelled' });
      } else {
        res.status(400).json({ message: 'Order cannot be cancelled' });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error cancelling order', error });
    }
  }
