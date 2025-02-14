// routes/index.js
const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const Order = require('../models/Order');

// Home page: Display list of restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.render('index', { restaurants });
  } catch (err) {
    res.status(500).send('Error fetching restaurants.');
  }
});

// Order page: Form for placing an order
router.get('/order', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.render('order', { restaurants });
  } catch (err) {
    res.status(500).send('Error loading order page.');
  }
});

// Order submission: Process order placement and render success view
router.post('/order', async (req, res) => {
  try {
    const { restaurantId, customerName, items } = req.body;
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
    res.status(500).send('Error placing order.');
  }
});

module.exports = router;
