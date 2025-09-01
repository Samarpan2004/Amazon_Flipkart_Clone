const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      qty: Number,
      price: Number,
      image: String
    }
  ],
  shippingAddress: {
    addressLine: String,
    city: String,
    state: String,
    pincode: String,
    phone: String
  },
  paymentMethod: String,
  paymentResult: {},
  itemsPrice: Number,
  taxPrice: Number,
  shippingPrice: Number,
  totalPrice: Number,
  isPaid: { type: Boolean, default: false },
  paidAt: Date,
  isDelivered: { type: Boolean, default: false },
  deliveredAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
