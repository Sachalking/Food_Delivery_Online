// models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  customerName: { type: String, required: true },
  items: { type: String, required: true },
  orderTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
