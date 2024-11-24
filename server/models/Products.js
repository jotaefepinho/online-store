const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String },
  tracklist: {
    sideA: { type: [String], default: [] },
    sideB: { type: [String], default: [] },
  },
  singles: { type: [String], default: [] },
  sampleUrl: { type: String, default: "" },
  genre: { type: [String], default: [] },
  artist: { type: String, required: true },
  stock: { type: Number, required: true },
  quantitySold: { type: Number, required: true }
});

module.exports = mongoose.model('Product', productSchema);