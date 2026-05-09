const mongoose = require('mongoose');
const connectDB = require('./db');
const Product = require('./models/Product');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const seedDB = async () => {
    await connectDB();
    
    // Seed User
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
        console.log('Default user created.');
    }

    // Seed Products
    const products = [
        { name: 'Aashirvaad Atta', category: 'Groceries', stockQuantity: 50, unitPrice: 250, productCode: 'P001' },
        { name: 'Tata Salt', category: 'Groceries', stockQuantity: 100, unitPrice: 25, productCode: 'P002' },
        { name: 'Sugar', category: 'Groceries', stockQuantity: 200, unitPrice: 45, productCode: 'P003' },
        { name: 'Rice Bags', category: 'Groceries', stockQuantity: 30, unitPrice: 1200, productCode: 'P004' },
        { name: 'Toor Dal', category: 'Groceries', stockQuantity: 40, unitPrice: 160, productCode: 'P005' },
        { name: 'Sunflower Oil', category: 'Oils', stockQuantity: 60, unitPrice: 180, productCode: 'P006' },
        { name: 'Maggi Noodles', category: 'Snacks', stockQuantity: 150, unitPrice: 14, productCode: 'P007' },
        { name: 'Parle-G Biscuits', category: 'Snacks', stockQuantity: 300, unitPrice: 5, productCode: 'P008' },
        { name: 'Tea Powder', category: 'Beverages', stockQuantity: 80, unitPrice: 350, productCode: 'P009' },
        { name: 'Detergent Powder', category: 'Cleaning', stockQuantity: 45, unitPrice: 120, productCode: 'P010' }
    ];

    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('10 Kirana products seeded.');

    mongoose.connection.close();
};

seedDB();
