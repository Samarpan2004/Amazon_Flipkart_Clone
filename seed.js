const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const bcrypt = require('bcryptjs');

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to Mongo for seeding');

  await User.deleteMany();
  await Product.deleteMany();
  await Order.deleteMany();

  const users = [
    { name: 'Admin', email: 'admin@example.com', password: await bcrypt.hash('password',10), role: 'admin' },
    { name: 'Sam', email: 'sam@example.com', password: await bcrypt.hash('password',10), role: 'customer' }
  ];

  const createdUsers = await User.insertMany(users);

  const products = [
    { name: 'iPhone 14 Pro', description: 'Apple flagship', price: 120000, countInStock: 10, category: 'Mobiles', images: ['https://via.placeholder.com/300'] },
    { name: 'Samsung Galaxy S23', description: 'Samsung flagship', price: 90000, countInStock: 15, category: 'Mobiles', images: ['https://via.placeholder.com/300'] },
    { name: 'Sony WH-1000XM5', description: 'Noise-cancelling headphones', price: 30000, countInStock: 20, category: 'Electronics', images: ['https://via.placeholder.com/300'] }
  ];

  await Product.insertMany(products);

  console.log('Seeding completed');
  process.exit();
}

seed().catch(err => { console.error(err); process.exit(1); });
