const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// register
router.post('/register', async (req,res) => {
  const { name, email, password, role } = req.body;
  const existing = await User.findOne({ email });
  if(existing) return res.status(400).json({ message: 'User exists' });
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, password: hashed, role });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

// login
router.post('/login', async (req,res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if(!user) return res.status(401).json({ message: 'Invalid credentials' });
  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

module.exports = router;
