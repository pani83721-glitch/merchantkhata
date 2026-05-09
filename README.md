# Trailblazers

## Problem Statement / Idea

### What is the problem?

Most small and medium-scale Kirana (grocery) store owners in India still rely on handwritten notebooks (khata) to manage their daily transactions, customer credit records, and inventory. This manual process is highly error-prone, difficult to search through, and provides no analytical insights into the business.

When a customer purchases groceries on credit, the shopkeeper writes it down in a register. When a payment is received, it gets scribbled somewhere else. Over time, tracking who owes how much, which products are running low, and how much revenue was collected on a specific day becomes nearly impossible without spending hours flipping through pages.

---

### Why is it important?

India has over 12 million Kirana stores, and they form the backbone of the country's retail economy. Despite their massive contribution, most of these stores operate without any digital tools for financial tracking or inventory management.

This leads to significant problems: disputes with customers over pending dues, inability to identify top-selling products, no visibility into daily or weekly revenue trends, and frequent stock-outs of essential items like sugar, rice, or cooking oil. These issues directly impact the shopkeeper's profitability and customer relationships.

A simple, intuitive digital khata system that mirrors the way shopkeepers already think about their business — customers, credit, payments, and stock — can dramatically improve their operational efficiency without requiring technical expertise.

---

### Who are the target users?

MerchantIQ is designed for small to mid-level Indian Kirana store owners and general merchants who need a modern, digital alternative to their traditional paper-based ledger systems.

These shopkeepers manage dozens of customers with running credit accounts, stock hundreds of grocery products, and process multiple transactions daily. They need a tool that is visually clear, requires minimal training, and provides instant insights into their business health — all without the complexity of enterprise-level ERP software.

---

## Proposed Solution

### What are you building?

We are building MerchantIQ, a full-stack Digital Khata and Analytics platform specifically designed for Indian Kirana stores. It replaces the traditional paper ledger with a real-time, database-driven system that tracks customer credit, manages inventory, generates business reports, and provides visual analytics — all through a premium, responsive web dashboard.

---

### How does it solve the problem?

MerchantIQ digitizes the entire workflow of a Kirana store owner. When a customer purchases groceries on credit, the shopkeeper logs it in the system with the customer name, product purchased, and amount. When a payment is received, it is recorded against that customer. The system automatically calculates running balances, highlights pending dues, and flags overdue accounts.

For inventory, the system tracks stock quantities in real-time. When products fall below a minimum threshold, low-stock alerts appear directly on the dashboard. The shopkeeper can see at a glance which items need restocking.

The analytics dashboard provides date-filtered views (Today, Yesterday, Last 7 Days) with dynamic bar charts showing daily sales versus credits, giving the shopkeeper a clear picture of cash flow trends. A one-click PDF export generates a comprehensive multi-page business report covering customers, inventory, transactions, and financial summaries.

---

### What makes your solution unique?

What makes MerchantIQ different is that it is purpose-built for the Indian Kirana context rather than being a generic accounting tool adapted for retail.

The system uses familiar concepts like "khata" (ledger), "udhar" (credit), and running balance calculations that mirror how shopkeepers already think about their business. The UI is designed to be visually premium yet operationally simple — a shopkeeper can log a transaction in under 10 seconds.

The date-filter system on the dashboard allows instant switching between today's and yesterday's collections, making it ideal for live demonstrations and daily reconciliation. The dark mode support, animated transitions, and sliding transaction drawer provide a modern, professional feel that elevates the tool beyond a basic spreadsheet replacement.

---

## Features

Dynamic Dashboard with Date Filtering
- Real-time analytics cards showing Payments Collected, Transactions Count, Pending Credits, and Total Customers
- Date filter buttons (Today, Yesterday, Last 7 Days) that dynamically recalculate all dashboard metrics
- Today's Summary section displaying Credits Given, Payments In, Inventory Value, and Low Stock count
- All values update automatically whenever a customer, product, or transaction is added

Sales Analytics with Recharts
- Interactive 7-day bar chart visualizing daily Sales (payments) vs Credits (dues)
- Built using Recharts with responsive containers, tooltips, and legends
- Chart data is computed dynamically from MongoDB transaction records

Low Stock Alert System
- Automatically identifies products with stock quantity below 20 units
- Displays product name, category, and remaining stock with visual urgency indicators
- Alerts update in real-time as inventory changes

Top Selling Products Ranking
- Ranks products by total credit revenue generated
- Displays product name, revenue amount, and percentage share of total sales
- Computed dynamically from all Credit-type transactions linked to products

Customer Credit & Ledger Management
- Full customer lifecycle management: Add Customer, Log Transaction, View History
- Running Balance Formula: Total Credits (including opening balance) minus Total Payments
- Transaction logging supports optional grocery product linking
- Inline ledger view with transaction history, type badges, product tags, and amounts

Product & Inventory Management
- Add Product modal with name, category, product code, stock quantity, and unit price
- Real-time inventory value calculation (Stock × Price) displayed in sidebar card
- Low stock visual indicators (red badges) for items below threshold
- Products saved directly to MongoDB and reflected instantly in the UI

Comprehensive PDF Export
- One-click generation of a multi-page professional PDF report using jsPDF and jspdf-autotable
- Page 1: Dashboard Summary with 8 key business metrics
- Page 2: Customer Balances Report with Credit, Paid, and Running Balance columns
- Page 3: Inventory Report with Product, Code, Category, Stock, Price, and Value
- Page 4: Transaction History (last 50 entries) with Date, Customer, Type, Amount, and Notes
- Branded header with store name and generation timestamp

Detailed Sub-Reports
- Sales Report: Total Revenue, Today's Sales, Transaction Count
- Inventory Report: Inventory Value, Product Count, Low Stock Count with full product table
- Customer Report: Total Customers, Pending Dues Count, Cleared Count with balance table
- Financial Report: Total Credits, Payments Collected, Pending Dues, Recovery Rate percentage

Dark Mode Support
- Full dark theme with complete CSS variable overrides for the Material Design 3 color system
- All components respond to theme changes: sidebar, cards, charts, tables, modals, navbar, and backgrounds
- Theme persists across browser sessions via localStorage
- Light/Dark mode selection cards in the Settings page

Enhanced Settings Page
- Theme Preferences with visual Light Mode and Dark Mode selection cards
- Profile Settings displaying merchant name, role, and email
- Store Information section with Store Name, Location, GST Number, and Contact
- Data Export Preferences with toggle controls for PDF content inclusion

Animated Transaction History Drawer
- Right-side sliding drawer triggered by the History icon in the navbar
- Built with Framer Motion spring animations for smooth open/close transitions
- Displays the latest 50 transactions globally with customer name, date, notes, amount, and type badges
- Backdrop blur overlay with click-to-close functionality

JWT Authentication
- Secure login system with email and password verification against hashed credentials
- JWT token generation and storage in localStorage
- Axios interceptors automatically attach Bearer tokens to all API requests
- Logout clears authentication state and redirects to the login page

Realistic Dummy Data Seeding
- Seed script populates MongoDB with 10 classic Indian Kirana products, 6 realistic customers, and 26 transactions spanning 7 days
- CSV files provided in the `dummy_data/` folder for reference and demonstration
- Data includes products like Aashirvaad Atta, Tata Salt, Sugar, Rice Bags, Toor Dal, Sunflower Oil, Maggi, Parle-G, Tea Powder, and Detergent Powder
- Customers include Rajesh Kumar, Suresh Yadav, Anita Sharma, Priya Patel, Lakshmi Devi, and Ramesh Gupta

## Tech Stack

*Frontend:*  
React  
Tailwind CSS (v4)  
Recharts  
Framer Motion  

*Backend:*  
Node.js  
Express.js  

*Database:*  
MongoDB with Mongoose  

*Authentication:*  
JSON Web Tokens (JWT)  
bcrypt.js  

*PDF Export:*  
jsPDF  
jspdf-autotable  

*State Management:*  
Zustand  

*HTTP Client:*  
Axios  

*Tools / Libraries:*  
dotenv  
cors  
Material Symbols (Google Fonts)  
Inter & Hanken Grotesk Typography  

---

## Setup

### Clone the repository

```bash
git clone https://github.com/pani83721-glitch/merchantkhata.git
cd merchant-dashboard
```

### Install dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd ..
npm install
```

### Seed the database

Make sure MongoDB is running locally on `mongodb://localhost:27017`, then:

```bash
cd server
node seed.js
```

This will populate the database with 10 Kirana products, 6 customers, and 26 transactions spanning 7 days.

### Run the application

You need two terminals running simultaneously:

**Terminal 1 — Backend Server:**

```bash
cd server
node server.js
```

The backend starts on `http://localhost:5000`

**Terminal 2 — Frontend Dev Server:**

```bash
npm run dev
```

The frontend starts on `http://localhost:5173`

### Default Login Credentials

```
Email:    contact@gorakshaknathmerchants.in
Password: password123
```

---

## Final Outcome

MerchantIQ transforms the traditional Indian Kirana store ledger system into a modern, database-driven digital platform. Instead of flipping through pages of a paper notebook to check who owes how much or which products are running low, the shopkeeper gets instant answers through a visually rich, interactive dashboard.

The date filtering system allows the shopkeeper to instantly compare today's collections with yesterday's, making daily reconciliation effortless. The Recharts-powered analytics provide a clear visual picture of sales trends over the past week, helping identify patterns like which days generate the most revenue or when credit tends to spike.

The customer ledger system maintains accurate running balances for every customer, eliminating disputes over pending dues. The PDF export feature generates professional, multi-page reports that can be printed or shared, adding a layer of documentation that paper ledgers cannot provide.

With dark mode support, animated transitions, and a responsive layout, MerchantIQ delivers a premium user experience that makes managing a Kirana store feel modern and professional. The entire system is built on the MERN stack (MongoDB, Express, React, Node.js), ensuring scalability, reliability, and the ability to extend functionality as the business grows.
