# Panisree

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

Interactive Dashboard
- Real-time KPI cards that update instantly with custom date filters
- Dynamic 7-day sales charts visualizing your business growth

Digital Khata (Ledger)
- Maintain customer profiles with automated running balance tracking
- Simple transaction logging for credit purchases and payments
- Detailed transaction history with search and filter support

Smart Inventory
- Track stock levels with automated alerts when items run low
- Real-time valuation of your entire store inventory

Professional Reports
- Generate multi-page PDF reports for accounting and stock taking
- Branded with your store name for professional record keeping

Secure Multi-User Access
- Private registration for merchants with complete data isolation
- Secure login ensuring only you can see your store's finances

Modern Design
- Full dark mode support for easy viewing during night hours
- Fast, responsive interface that works smoothly on any device

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
