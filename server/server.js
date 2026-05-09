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

// --- CORS Configuration ---
const allowedOrigins = [
    'http://localhost:5173',
    'https://merchant-khata.netlify.app', // Example Netlify URL - replace with your actual Netlify URL
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1 && !allowedOrigins.includes('*')) {
            var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

app.use(express.json());

// Health Check for Render
app.get('/', (req, res) => res.send('MerchantIQ Backend is Running...'));

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
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
        jwt.sign(payload, JWT_SECRET, { expiresIn: '5 days' }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
        });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password, storeName } = req.body;
        let existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ msg: 'A merchant with this email already exists' });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: storeName ? `Owner - ${storeName}` : 'Merchant / Store Owner'
        });
        const payload = { user: { id: user.id } };
        jwt.sign(payload, JWT_SECRET, { expiresIn: '5 days' }, (err, token) => {
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

// --- PRODUCTS (user-isolated) ---
app.get('/api/products', authMiddleware, async (req, res) => {
    const products = await Product.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(products);
});

app.post('/api/products', authMiddleware, async (req, res) => {
    try {
        const newProduct = new Product({ ...req.body, userId: req.user.id });
        const product = await newProduct.save();
        res.json(product);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// --- CUSTOMERS (user-isolated) ---
app.get('/api/customers', authMiddleware, async (req, res) => {
    const customers = await Customer.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(customers);
});

app.post('/api/customers', authMiddleware, async (req, res) => {
    try {
        const newCustomer = new Customer({ ...req.body, userId: req.user.id });
        const customer = await newCustomer.save();
        res.json(customer);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// --- TRANSACTIONS (user-isolated) ---
app.get('/api/transactions', authMiddleware, async (req, res) => {
    const transactions = await Transaction.find({ userId: req.user.id }).populate('customerId').populate('items.productId').sort({ date: -1 });
    res.json(transactions);
});

app.post('/api/transactions', authMiddleware, async (req, res) => {
    try {
        const { customerId, type, amount, notes, items, date } = req.body;
        const newTransaction = new Transaction({ userId: req.user.id, customerId, type, amount, notes, items, date });
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
