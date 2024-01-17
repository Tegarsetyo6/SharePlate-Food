const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const orderSchema = Schema(
  {
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'done'],
      default: 'pending',
    },
    recipient: {
      type: mongoose.Types.ObjectId,
      ref: 'Recipient',
      required: true,
    },
    sellerId: {
      type: mongoose.Types.ObjectId,
      ref: 'Seller',
      required: true,
    },
    sellerMenuId: {
      type: mongoose.Types.ObjectId,
      ref: 'SellerMenu',
      required: true,
    },
    amount: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
