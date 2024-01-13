const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const donationMenuSchema = Schema({
  name: {
    type: String,
    minlength: [3, 'Panjang nama menu minimal 3 karakter'],
    maxlength: [20, 'Panjang nama menu maksimum 20 karakter'],
    required: [true, 'Nama menu harus diisi'],
  },
  description: {
    type: String,
    minlength: [3, 'Panjang nama menu minimal 3 karakter'],
    maxlength: [100, 'Panjang nama menu maksimum 100 karakter'],
    required: [true, 'Nama menu harus diisi'],
  },
  category: {
    type: String,
  },
  sellerId: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    require: true,
  },
  longitude: {
    type: String,
  },
  latitude: {
    type: String,
  },
});

module.exports = model('DonationMenu', donationMenuSchema);
