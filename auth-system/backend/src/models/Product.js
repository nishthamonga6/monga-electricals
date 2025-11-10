const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, default: 0 },
    desc: { type: String },
    brand: { type: String, index: true },
    images: [{ type: String }],
    stock: { type: Number, default: 0 },
    metadata: { type: Object },
  },
  { timestamps: true }
);

// Product model removed: backend cleaned up
module.exports = {};
