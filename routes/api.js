// routes/api.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Restaurant = require('../models/Restaurant');

// Endpoint: Place an order (API)
// This endpoint returns JSON.
router.post('/order', async (req, res) => {
  const { restaurantId, customerName, items } = req.body;
  try {
    // Validate restaurant existence
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(400).json({ success: false, message: 'Invalid restaurant.' });
    }
    const order = new Order({
      restaurant: restaurantId,
      customerName,
      items
    });
    await order.save();
    // Render the success page with the order ID
    res.render('success', { orderId: order._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Endpoint: Get all restaurants (for API testing)
router.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
