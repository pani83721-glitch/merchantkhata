const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const connectDB = require('./db');
const User = require('./models/User');
const Product = require('./models/Product');
const Customer = require('./models/Customer');
const Transaction = require('./models/Transaction');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET || 'secret123');
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

// --- AUTH ---
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });
        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET || 'secret123', { expiresIn: '5 days' }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
        });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

app.get('/api/auth/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// --- PRODUCTS ---
app.get('/api/products', async (req, res) => {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
});

app.post('/api/products', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const product = await newProduct.save();
        res.json(product);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// --- CUSTOMERS ---
app.get('/api/customers', async (req, res) => {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
});

app.post('/api/customers', async (req, res) => {
    try {
        const newCustomer = new Customer(req.body);
        const customer = await newCustomer.save();
        res.json(customer);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// --- TRANSACTIONS ---
app.get('/api/transactions', async (req, res) => {
    const transactions = await Transaction.find().populate('customerId').populate('items.productId').sort({ date: -1 });
    res.json(transactions);
});

app.post('/api/transactions', async (req, res) => {
    try {
        const { customerId, type, amount, notes, items, date } = req.body;
        const newTransaction = new Transaction({ customerId, type, amount, notes, items, date });
        const transaction = await newTransaction.save();

        // Update product stock if items are present
        if (items && items.length > 0) {
            for (let item of items) {
                await Product.findByIdAndUpdate(item.productId, { $inc: { stockQuantity: -item.quantity } });
            }
        }

        res.json(transaction);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
