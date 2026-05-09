const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    stockQuantity: { type: Number, required: true, default: 0 },
    unitPrice: { type: Number, required: true },
    productCode: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);
