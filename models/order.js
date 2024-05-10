// models/order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  books: [{
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    },
    quantity: {
      type: Number,
      default: 1
    }
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['in progress', 'completed', 'cancelled'],
    default: 'in progress'
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  completionDate: {
    type: Date
  }
});

module.exports = mongoose.model('Order', orderSchema);
