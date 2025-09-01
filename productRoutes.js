const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products
router.get('/', async (req,res) => {
  const products = await Product.find().limit(100);
  res.json({ products });
});

// GET /api/products/:id
router.get('/:id', async (req,res) => {
  const product = await Product.findById(req.params.id);
  if(product) res.json(product);
  else res.status(404).json({ message: 'Product not found' });
});

// POST /api/products (simple, no auth)
router.post('/', async (req,res) => {
  const p = new Product(req.body);
  const created = await p.save();
  res.status(201).json(created);
});

module.exports = router;
