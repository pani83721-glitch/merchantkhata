const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    type: { type: String, enum: ['Credit', 'Payment'], required: true },
    amount: { type: Number, required: true },
    notes: { type: String },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number },
        price: { type: Number }
    }],
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
