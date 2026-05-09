const mongoose = require('mongoose');
const connectDB = require('./db');
const Product = require('./models/Product');
const Customer = require('./models/Customer');
const Transaction = require('./models/Transaction');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const daysAgo = (n) => {
    const d = new Date();
    d.setDate(d.getDate() - n);
    d.setHours(10 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 60), 0, 0);
    return d;
};

const seedDB = async () => {
    await connectDB();

    // --- Seed Admin User ---
    const existingUser = await User.findOne({ email: 'contact@gorakshaknathmerchants.in' });
    if (!existingUser) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);
        await User.create({
            name: 'Gorakshaknath',
            email: 'contact@gorakshaknathmerchants.in',
            password: hashedPassword,
            role: 'Merchant / Store Owner'
        });
        console.log('✅ Default admin user created.');
    } else {
        console.log('ℹ️  Admin user already exists, skipping.');
    }

    // --- Seed Products ---
    await Product.deleteMany();
    const products = await Product.insertMany([
        { name: 'Aashirvaad Atta', category: 'Groceries', stockQuantity: 50, unitPrice: 250, productCode: 'P001' },
        { name: 'Tata Salt', category: 'Groceries', stockQuantity: 100, unitPrice: 25, productCode: 'P002' },
        { name: 'Sugar', category: 'Groceries', stockQuantity: 8, unitPrice: 45, productCode: 'P003' },
        { name: 'Rice Bags', category: 'Groceries', stockQuantity: 30, unitPrice: 1200, productCode: 'P004' },
        { name: 'Toor Dal', category: 'Groceries', stockQuantity: 40, unitPrice: 160, productCode: 'P005' },
        { name: 'Sunflower Oil', category: 'Oils', stockQuantity: 60, unitPrice: 180, productCode: 'P006' },
        { name: 'Maggi Noodles', category: 'Snacks', stockQuantity: 150, unitPrice: 14, productCode: 'P007' },
        { name: 'Parle-G Biscuits', category: 'Snacks', stockQuantity: 300, unitPrice: 5, productCode: 'P008' },
        { name: 'Tea Powder', category: 'Beverages', stockQuantity: 12, unitPrice: 350, productCode: 'P009' },
        { name: 'Detergent Powder', category: 'Cleaning', stockQuantity: 45, unitPrice: 120, productCode: 'P010' }
    ]);
    console.log('✅ 10 Kirana products seeded.');

    // Build a product lookup by name
    const pMap = {};
    products.forEach(p => { pMap[p.name] = p._id; });

    // --- Seed Customers ---
    await Customer.deleteMany();
    const customers = await Customer.insertMany([
        { name: 'Rajesh Kumar', phone: '+91 98765 43210', openingBalance: 2500, createdAt: daysAgo(30) },
        { name: 'Suresh Yadav', phone: '+91 87654 32109', openingBalance: 1800, createdAt: daysAgo(25) },
        { name: 'Anita Sharma', phone: '+91 76543 21098', openingBalance: 0, createdAt: daysAgo(20) },
        { name: 'Priya Patel', phone: '+91 65432 10987', openingBalance: 3200, createdAt: daysAgo(15) },
        { name: 'Lakshmi Devi', phone: '+91 94321 09876', openingBalance: 500, createdAt: daysAgo(10) },
        { name: 'Ramesh Gupta', phone: '+91 83210 98765', openingBalance: 1200, createdAt: daysAgo(7) }
    ]);
    console.log('✅ 6 Customers seeded.');

    // Build a customer lookup by name
    const cMap = {};
    customers.forEach(c => { cMap[c.name] = c._id; });

    // --- Seed Transactions (spanning Today through 6 days ago) ---
    await Transaction.deleteMany();

    const txData = [
        // Today (day 0)
        { cust: 'Rajesh Kumar', prod: 'Sugar', type: 'Credit', amount: 450, notes: '5kg Sugar purchase', day: 0 },
        { cust: 'Rajesh Kumar', prod: null, type: 'Payment', amount: 1000, notes: 'UPI Payment received', day: 0 },
        { cust: 'Suresh Yadav', prod: 'Rice Bags', type: 'Credit', amount: 2400, notes: '2x Rice Bags', day: 0 },
        { cust: 'Anita Sharma', prod: 'Tata Salt', type: 'Credit', amount: 75, notes: '3x Tata Salt packets', day: 0 },
        { cust: 'Anita Sharma', prod: 'Maggi Noodles', type: 'Credit', amount: 140, notes: '10x Maggi packs', day: 0 },
        { cust: 'Priya Patel', prod: null, type: 'Payment', amount: 500, notes: 'Cash payment', day: 0 },
        { cust: 'Lakshmi Devi', prod: 'Tea Powder', type: 'Credit', amount: 700, notes: '2x Tea Powder', day: 0 },
        { cust: 'Ramesh Gupta', prod: 'Sunflower Oil', type: 'Credit', amount: 360, notes: '2L Sunflower Oil', day: 0 },

        // Yesterday (day 1)
        { cust: 'Rajesh Kumar', prod: 'Aashirvaad Atta', type: 'Credit', amount: 500, notes: '2x Atta bags', day: 1 },
        { cust: 'Suresh Yadav', prod: null, type: 'Payment', amount: 800, notes: 'Cash partial payment', day: 1 },
        { cust: 'Priya Patel', prod: 'Toor Dal', type: 'Credit', amount: 480, notes: '3kg Toor Dal', day: 1 },
        { cust: 'Lakshmi Devi', prod: null, type: 'Payment', amount: 300, notes: 'UPI Payment', day: 1 },
        { cust: 'Ramesh Gupta', prod: 'Detergent Powder', type: 'Credit', amount: 240, notes: '2x Detergent', day: 1 },
        { cust: 'Anita Sharma', prod: null, type: 'Payment', amount: 200, notes: 'Cash payment', day: 1 },

        // 2 days ago
        { cust: 'Rajesh Kumar', prod: 'Parle-G Biscuits', type: 'Credit', amount: 50, notes: '10x Parle-G', day: 2 },
        { cust: 'Suresh Yadav', prod: 'Sugar', type: 'Credit', amount: 270, notes: '6kg Sugar', day: 2 },
        { cust: 'Priya Patel', prod: null, type: 'Payment', amount: 1500, notes: 'Monthly settlement', day: 2 },
        { cust: 'Ramesh Gupta', prod: null, type: 'Payment', amount: 600, notes: 'UPI Payment', day: 2 },

        // 3 days ago
        { cust: 'Lakshmi Devi', prod: 'Aashirvaad Atta', type: 'Credit', amount: 250, notes: '1x Atta bag', day: 3 },
        { cust: 'Suresh Yadav', prod: 'Tea Powder', type: 'Credit', amount: 350, notes: '1x Tea Powder', day: 3 },

        // 4 days ago
        { cust: 'Rajesh Kumar', prod: null, type: 'Payment', amount: 2000, notes: 'Weekly settlement', day: 4 },
        { cust: 'Priya Patel', prod: 'Rice Bags', type: 'Credit', amount: 1200, notes: '1x Rice bag', day: 4 },

        // 5 days ago
        { cust: 'Anita Sharma', prod: 'Sunflower Oil', type: 'Credit', amount: 180, notes: '1L Oil', day: 5 },
        { cust: 'Ramesh Gupta', prod: 'Maggi Noodles', type: 'Credit', amount: 70, notes: '5x Maggi', day: 5 },

        // 6 days ago
        { cust: 'Lakshmi Devi', prod: null, type: 'Payment', amount: 450, notes: 'Cash payment', day: 6 },
        { cust: 'Suresh Yadav', prod: null, type: 'Payment', amount: 1200, notes: 'Full settlement', day: 6 },
    ];

    const txDocs = txData.map(tx => ({
        customerId: cMap[tx.cust],
        type: tx.type,
        amount: tx.amount,
        notes: tx.notes,
        items: tx.prod ? [{ productId: pMap[tx.prod], quantity: 1, price: products.find(p => p.name === tx.prod)?.unitPrice || 0 }] : [],
        date: daysAgo(tx.day)
    }));

    await Transaction.insertMany(txDocs);
    console.log(`✅ ${txDocs.length} Transactions seeded across 7 days.`);

    console.log('\n🎉 Database seeded successfully! Run "node server.js" to start the backend.');
    mongoose.connection.close();
};

seedDB();
