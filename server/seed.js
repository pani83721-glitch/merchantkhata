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
    let adminUser = await User.findOne({ email: 'contact@gorakshaknathmerchants.in' });
    if (!adminUser) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);
        adminUser = await User.create({
            name: 'Gorakshaknath',
            email: 'contact@gorakshaknathmerchants.in',
            password: hashedPassword,
            role: 'Merchant / Store Owner'
        });
        console.log('✅ Default admin user created.');
    } else {
        console.log('ℹ️  Admin user already exists, skipping.');
    }

    const uid = adminUser._id;

    // --- Seed Products (linked to admin) ---
    await Product.deleteMany({ userId: uid });
    try {
        await Product.collection.dropIndex('productCode_1');
    } catch (e) {
        // Index might not exist, ignore
    }
    const products = await Product.insertMany([
        { userId: uid, name: 'Aashirvaad Atta', category: 'Groceries', stockQuantity: 50, unitPrice: 250, productCode: 'P001' },
        { userId: uid, name: 'Tata Salt', category: 'Groceries', stockQuantity: 100, unitPrice: 25, productCode: 'P002' },
        { userId: uid, name: 'Sugar', category: 'Groceries', stockQuantity: 8, unitPrice: 45, productCode: 'P003' },
        { userId: uid, name: 'Rice Bags', category: 'Groceries', stockQuantity: 30, unitPrice: 1200, productCode: 'P004' },
        { userId: uid, name: 'Toor Dal', category: 'Groceries', stockQuantity: 40, unitPrice: 160, productCode: 'P005' },
        { userId: uid, name: 'Sunflower Oil', category: 'Oils', stockQuantity: 60, unitPrice: 180, productCode: 'P006' },
        { userId: uid, name: 'Maggi Noodles', category: 'Snacks', stockQuantity: 150, unitPrice: 14, productCode: 'P007' },
        { userId: uid, name: 'Parle-G Biscuits', category: 'Snacks', stockQuantity: 300, unitPrice: 5, productCode: 'P008' },
        { userId: uid, name: 'Tea Powder', category: 'Beverages', stockQuantity: 12, unitPrice: 350, productCode: 'P009' },
        { userId: uid, name: 'Detergent Powder', category: 'Cleaning', stockQuantity: 45, unitPrice: 120, productCode: 'P010' }
    ]);
    console.log('✅ 10 Kirana products seeded.');

    const pMap = {};
    products.forEach(p => { pMap[p.name] = p._id; });

    // --- Seed 10 Customers (linked to admin) ---
    await Customer.deleteMany({ userId: uid });
    const customers = await Customer.insertMany([
        { userId: uid, name: 'Rajesh Kumar', phone: '+91 98765 43210', openingBalance: 2500, createdAt: daysAgo(30) },
        { userId: uid, name: 'Suresh Yadav', phone: '+91 87654 32109', openingBalance: 1800, createdAt: daysAgo(25) },
        { userId: uid, name: 'Anita Sharma', phone: '+91 76543 21098', openingBalance: 0, createdAt: daysAgo(20) },
        { userId: uid, name: 'Priya Patel', phone: '+91 65432 10987', openingBalance: 3200, createdAt: daysAgo(15) },
        { userId: uid, name: 'Lakshmi Devi', phone: '+91 94321 09876', openingBalance: 500, createdAt: daysAgo(10) },
        { userId: uid, name: 'Ramesh Gupta', phone: '+91 83210 98765', openingBalance: 1200, createdAt: daysAgo(7) },
        { userId: uid, name: 'Arjun Reddy', phone: '+91 99887 76655', openingBalance: 0, createdAt: daysAgo(6) },
        { userId: uid, name: 'Sneha Verma', phone: '+91 91234 56789', openingBalance: 4500, createdAt: daysAgo(5) },
        { userId: uid, name: 'Kavitha Rao', phone: '+91 88990 01122', openingBalance: 150, createdAt: daysAgo(4) },
        { userId: uid, name: 'Mahesh Babu', phone: '+91 77665 54433', openingBalance: 0, createdAt: daysAgo(3) }
    ]);
    console.log('✅ 10 Customers seeded.');

    const cMap = {};
    customers.forEach(c => { cMap[c.name] = c._id; });

    // --- Seed Transactions (linked to admin) ---
    await Transaction.deleteMany({ userId: uid });

    const txData = [
        // Today
        { cust: 'Rajesh Kumar', prod: 'Sugar', type: 'Credit', amount: 450, notes: '5kg Sugar purchase', day: 0 },
        { cust: 'Rajesh Kumar', prod: null, type: 'Payment', amount: 1000, notes: 'UPI Payment received', day: 0 },
        { cust: 'Suresh Yadav', prod: 'Rice Bags', type: 'Credit', amount: 2400, notes: '2x Rice Bags', day: 0 },
        { cust: 'Arjun Reddy', prod: 'Maggi Noodles', type: 'Credit', amount: 280, notes: '20x Maggi packs', day: 0 },
        { cust: 'Mahesh Babu', prod: 'Tata Salt', type: 'Credit', amount: 50, notes: '2x Salt packs', day: 0 },
        
        // Yesterday
        { cust: 'Anita Sharma', prod: 'Tata Salt', type: 'Credit', amount: 75, notes: '3x Tata Salt packets', day: 1 },
        { cust: 'Anita Sharma', prod: 'Maggi Noodles', type: 'Credit', amount: 140, notes: '10x Maggi packs', day: 1 },
        { cust: 'Sneha Verma', prod: 'Sunflower Oil', type: 'Credit', amount: 1800, notes: '10L Oil bulk', day: 1 },
        { cust: 'Kavitha Rao', prod: null, type: 'Payment', amount: 150, notes: 'Full settlement', day: 1 },

        // 2 days ago
        { cust: 'Priya Patel', prod: null, type: 'Payment', amount: 500, notes: 'Cash payment', day: 2 },
        { cust: 'Lakshmi Devi', prod: 'Tea Powder', type: 'Credit', amount: 700, notes: '2x Tea Powder', day: 2 },
        { cust: 'Ramesh Gupta', prod: 'Sunflower Oil', type: 'Credit', amount: 360, notes: '2L Sunflower Oil', day: 2 },
        { cust: 'Rajesh Kumar', prod: 'Aashirvaad Atta', type: 'Credit', amount: 500, notes: '2x Atta bags', day: 2 },

        // 3 days ago
        { cust: 'Suresh Yadav', prod: null, type: 'Payment', amount: 800, notes: 'Cash partial payment', day: 3 },
        { cust: 'Priya Patel', prod: 'Toor Dal', type: 'Credit', amount: 480, notes: '3kg Toor Dal', day: 3 },
        { cust: 'Mahesh Babu', prod: 'Parle-G Biscuits', type: 'Credit', amount: 100, notes: '20x Parle-G', day: 3 },

        // 4 days ago
        { cust: 'Lakshmi Devi', prod: null, type: 'Payment', amount: 300, notes: 'UPI Payment', day: 4 },
        { cust: 'Ramesh Gupta', prod: 'Detergent Powder', type: 'Credit', amount: 240, notes: '2x Detergent', day: 4 },
        { cust: 'Anita Sharma', prod: null, type: 'Payment', amount: 200, notes: 'Cash payment', day: 4 },

        // 5 days ago
        { cust: 'Sneha Verma', prod: 'Rice Bags', type: 'Credit', amount: 1200, notes: '1x Rice Bag', day: 5 },
        { cust: 'Arjun Reddy', prod: null, type: 'Payment', amount: 100, notes: 'Token payment', day: 5 },

        // 6 days ago
        { cust: 'Rajesh Kumar', prod: 'Parle-G Biscuits', type: 'Credit', amount: 50, notes: '10x Parle-G', day: 6 },
        { cust: 'Suresh Yadav', prod: 'Sugar', type: 'Credit', amount: 270, notes: '6kg Sugar', day: 6 },
        { cust: 'Priya Patel', prod: null, type: 'Payment', amount: 1500, notes: 'Monthly settlement', day: 6 }
    ];

    const txDocs = txData.map(tx => ({
        userId: uid,
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
