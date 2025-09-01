const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST /api/orders
router.post('/', async (req,res) => {
  const order = new Order(req.body);
  const created = await order.save();
  res.status(201).json(created);
});

// GET /api/orders/:id
router.get('/:id', async (req,res) => {
  const order = await Order.findById(req.params.id);
  if(order) res.json(order);
  else res.status(404).json({ message: 'Order not found' });
});

module.exports = router;
