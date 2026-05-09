import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useStore } from './store';

// --- Helpers ---
const formatInr = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount || 0);
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const d = new Date(dateString);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const API_URL = 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_URL });
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('merchantiq_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// --- Shared Components ---

const Sidebar = ({ activePage, setActivePage }) => {
    const { logout } = useStore();
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
        { id: 'products', label: 'Products', icon: 'inventory_2' },
        { id: 'customers', label: 'Customers', icon: 'group' },
        { id: 'reports', label: 'Reports', icon: 'analytics' },
        { id: 'settings', label: 'Settings', icon: 'settings' }
    ];

    return (
        <aside className="h-screen w-64 fixed left-0 top-0 border-r border-outline-variant bg-surface flex flex-col gap-sm p-md z-50">
            <div className="flex items-center gap-sm px-sm mb-xl">
                <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center text-on-primary-container transition-transform duration-300 hover:scale-[1.05]">
                    <span className="material-symbols-outlined text-headline-sm fill-1">analytics</span>
                </div>
                <div>
                    <h1 className="font-headline-sm text-headline-sm font-bold text-primary">MerchantIQ</h1>
                    <p className="text-label-sm text-on-surface-variant">Analytics Pro</p>
                </div>
            </div>
            <nav className="flex-grow flex flex-col gap-xs">
                {navItems.map((item) => {
                    const isActive = activePage === item.id;
                    return (
                        <button 
                            key={item.id}
                            onClick={() => setActivePage(item.id)} 
                            className={`w-full text-left flex items-center gap-md px-md py-sm rounded-lg transition-all duration-300 active:scale-95 hover:scale-[1.02] ${isActive ? 'bg-primary-container text-on-primary-container font-bold shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
                        >
                            <span className={`material-symbols-outlined ${isActive ? 'fill-1' : ''}`}>{item.icon}</span>
                            <span className="font-body-md">{item.label}</span>
                        </button>
                    );
                })}
            </nav>
            <div className="mt-auto flex flex-col gap-xs">
                <div className="bg-surface-container-highest p-md rounded-xl mb-md transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                    <p className="text-body-sm font-bold text-primary mb-xs">Professional Plan</p>
                    <p className="text-[11px] text-on-surface-variant mb-sm">Unlock advanced insights and exports.</p>
                    <button className="w-full bg-primary text-on-primary py-xs rounded-lg text-label-md font-bold hover:opacity-90 active:scale-95 transition-all duration-300">Upgrade to Pro</button>
                </div>
                <button onClick={logout} className="w-full text-left flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-high transition-all duration-300 hover:scale-[1.02] active:scale-95 rounded-lg">
                    <span className="material-symbols-outlined text-error">logout</span>
                    <span className="font-body-md text-error">Logout</span>
                </button>
            </div>
        </aside>
    );
};

const Header = () => {
    const { toggleDrawer, user } = useStore();
    return (
        <header className="fixed top-0 right-0 w-[calc(100%-256px)] z-40 bg-surface/80 backdrop-blur-md border-b border-outline-variant shadow-sm flex justify-between items-center px-lg py-md h-20 animate-fade-in">
            <div className="flex items-center gap-md bg-surface-container-low border border-outline-variant px-md py-sm rounded-full w-96 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent focus-within:shadow-md">
                <span className="material-symbols-outlined text-outline">search</span>
                <input className="bg-transparent border-none focus:ring-0 text-body-md w-full focus:outline-none" placeholder="Search data, reports, or metrics..." type="text"/>
            </div>
            <div className="flex items-center gap-lg">
                <div className="flex items-center gap-md border-r border-outline-variant pr-lg text-on-surface-variant">
                    <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-all duration-300 hover:scale-110 active:scale-95">notifications</span>
                    <span onClick={toggleDrawer} className="material-symbols-outlined cursor-pointer hover:text-primary transition-all duration-300 hover:scale-110 active:scale-95">history</span>
                    <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-all duration-300 hover:scale-110 active:scale-95">chat</span>
                </div>
                <div className="flex items-center gap-sm cursor-pointer active:scale-95 transition-all duration-300 hover:opacity-80">
                    <img alt="User Profile" className="w-8 h-8 rounded-full bg-surface-container-highest object-cover" src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=150&q=80"/>
                    <div className="flex flex-col">
                        <span className="font-label-md text-primary leading-none">{user?.name || 'Gorakshaknath'}</span>
                        <span className="text-[10px] text-on-surface-variant">{user?.role || 'Merchant / Store Owner'}</span>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant text-sm">expand_more</span>
                </div>
            </div>
        </header>
    );
};

const HistoryDrawer = ({ transactions, customers }) => {
    const { isDrawerOpen, toggleDrawer } = useStore();
    return (
        <AnimatePresence>
            {isDrawerOpen && (
                <>
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                        onClick={toggleDrawer}
                    />
                    <motion.div 
                        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-96 bg-surface shadow-2xl z-50 border-l border-outline-variant flex flex-col"
                    >
                        <div className="p-lg border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
                            <h2 className="font-headline-sm text-primary">Recent Transactions</h2>
                            <button onClick={toggleDrawer} className="material-symbols-outlined text-on-surface-variant hover:text-primary hover:bg-surface-container p-1 rounded-full transition-colors">close</button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-md space-y-sm">
                            {transactions.slice(0, 50).map(t => {
                                const customer = customers.find(c => c._id === t.customerId?._id || c._id === t.customerId);
                                const isCredit = t.type === 'Credit';
                                return (
                                    <div key={t._id} className="p-md bg-surface-container-lowest border border-outline-variant rounded-xl flex items-center justify-between hover:shadow-md transition-shadow">
                                        <div>
                                            <p className="font-bold text-on-surface">{customer?.name || 'Unknown'}</p>
                                            <p className="text-[11px] text-on-surface-variant">{formatDate(t.date)} • {t.notes || 'No notes'}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className={`font-bold ${isCredit ? 'text-error' : 'text-green-700'}`}>{isCredit ? '+' : '-'}{formatInr(t.amount)}</p>
                                            <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${isCredit ? 'bg-error-container text-on-error-container' : 'bg-green-100 text-green-800'}`}>{t.type}</span>
                                        </div>
                                    </div>
                                );
                            })}
                            {transactions.length === 0 && <p className="text-center text-on-surface-variant mt-xl">No recent transactions.</p>}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const MainWrapper = ({ children, activePage, setActivePage, transactions, customers }) => (
    <div className="min-h-screen bg-surface">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <main className="ml-64">
            <Header />
            <div className="pt-20 p-xl max-w-[1440px] mx-auto animate-fade-in-up">
                {children}
            </div>
        </main>
        <HistoryDrawer transactions={transactions} customers={customers} />
    </div>
);

// --- Login Page ---
const Login = () => {
    const { setUser } = useStore();
    const [email, setEmail] = useState('contact@gorakshaknathmerchants.in');
    const [password, setPassword] = useState('password123');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, password });
            setUser(res.data.user, res.data.token);
        } catch (err) {
            setError('Invalid credentials or server not running.');
        }
    };

    return (
        <div className="bg-background font-body-md text-on-background min-h-screen flex items-center justify-center p-md animate-fade-in" style={{
            backgroundImage: "linear-gradient(rgba(237, 244, 255, 0.8), rgba(237, 244, 255, 0.8)), url('https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1920&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <main className="w-full max-w-[440px] z-10 animate-fade-in-up">
                <div className="flex flex-col items-center mb-xl">
                    <div className="bg-primary-container p-sm rounded-xl mb-md shadow-sm transition-transform duration-300 hover:scale-[1.05]">
                        <span className="material-symbols-outlined text-on-primary-container text-[32px]">inventory_2</span>
                    </div>
                    <h1 className="font-headline-md text-headline-md text-primary tracking-tight">MerchantIQ</h1>
                    <p className="font-body-md text-on-surface-variant mt-xs">Digital Khata & Analytics</p>
                </div>

                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-[0_20px_40px_-15px_rgba(4,31,118,0.08)] p-xl transition-all duration-300 hover:shadow-[0_25px_50px_-12px_rgba(4,31,118,0.12)]">
                    <div className="mb-lg">
                        <h2 className="font-headline-sm text-headline-sm text-on-surface">Welcome back</h2>
                        <p className="font-body-sm text-on-surface-variant">Please enter your details to sign in</p>
                        {error && <p className="text-error text-sm mt-2">{error}</p>}
                    </div>

                    <form className="space-y-lg" onSubmit={handleLogin}>
                        <div className="space-y-sm">
                            <label className="block font-body-sm font-bold text-on-surface" htmlFor="username">Email Address</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">mail</span>
                                <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full pl-[48px] pr-md py-md bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all placeholder:text-outline" id="username" type="email" required />
                            </div>
                        </div>

                        <div className="space-y-sm">
                            <div className="flex justify-between items-center">
                                <label className="block font-body-sm font-bold text-on-surface" htmlFor="password">Password</label>
                            </div>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">lock</span>
                                <input value={password} onChange={e=>setPassword(e.target.value)} className="w-full pl-[48px] pr-md py-md bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all placeholder:text-outline" id="password" type="password" required />
                            </div>
                        </div>

                        <button className="w-full bg-primary-container text-on-primary font-headline-sm py-md rounded-lg shadow-sm hover:opacity-90 active:scale-[0.98] transition-all duration-300" type="submit">
                            Sign In
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

// --- Pages ---

const Dashboard = ({ customers, transactions, products, getCustomerMetrics }) => {
    const [dateFilter, setDateFilter] = useState('today');

    const getFilterDate = () => {
        const d = new Date();
        if (dateFilter === 'yesterday') { d.setDate(d.getDate() - 1); }
        if (dateFilter === 'week') { d.setDate(d.getDate() - 7); return d; }
        d.setHours(0, 0, 0, 0);
        return d;
    };

    const filterTx = (txList) => {
        if (dateFilter === 'week') {
            const start = getFilterDate();
            return txList.filter(t => new Date(t.date) >= start);
        }
        const targetStr = getFilterDate().toDateString();
        return txList.filter(t => new Date(t.date).toDateString() === targetStr);
    };

    const filteredTx = filterTx(transactions);
    const filteredPayments = filteredTx.filter(t => t.type === 'Payment').reduce((s, t) => s + Number(t.amount), 0);
    const filteredCredits = filteredTx.filter(t => t.type === 'Credit').reduce((s, t) => s + Number(t.amount), 0);
    const filteredCount = filteredTx.length;

    let totalPendingCredits = 0;
    let pendingCustomerCount = 0;
    customers.forEach(c => {
        const m = getCustomerMetrics(c._id);
        if (m.runningBalance > 0) { totalPendingCredits += m.runningBalance; pendingCustomerCount++; }
    });

    const totalInv = products.reduce((s, p) => s + (p.stockQuantity * p.unitPrice), 0);
    const lowStockProducts = products.filter(p => p.stockQuantity < 20);

    // Build 7-day chart data
    const chartData = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date(); d.setDate(d.getDate() - i); d.setHours(0,0,0,0);
        const dayStr = d.toDateString();
        const dayTx = transactions.filter(t => new Date(t.date).toDateString() === dayStr);
        const label = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
        chartData.push({
            name: label,
            Sales: dayTx.filter(t => t.type === 'Payment').reduce((s, t) => s + Number(t.amount), 0),
            Credits: dayTx.filter(t => t.type === 'Credit').reduce((s, t) => s + Number(t.amount), 0),
            Transactions: dayTx.length
        });
    }

    // Top selling: count product appearances in Credit transactions
    const productSales = {};
    transactions.filter(t => t.type === 'Credit').forEach(t => {
        if (t.items?.length > 0 && t.items[0].productId) {
            const pName = typeof t.items[0].productId === 'object' ? t.items[0].productId.name : 'Unknown';
            productSales[pName] = (productSales[pName] || 0) + Number(t.amount);
        }
    });
    const topProducts = Object.entries(productSales).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const topTotal = topProducts.reduce((s, [, v]) => s + v, 0);

    const recentTx = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 8);

    const filterLabel = dateFilter === 'today' ? "Today" : dateFilter === 'yesterday' ? "Yesterday" : "Last 7 Days";

    return (
        <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-lg">
                <div>
                    <h2 className="font-headline-lg text-headline-lg text-primary">Overview</h2>
                    <p className="text-on-surface-variant font-body-md">Welcome back. Here's what's happening — {filterLabel}.</p>
                </div>
                <div className="flex gap-sm">
                    {['today', 'yesterday', 'week'].map(f => (
                        <button key={f} onClick={() => setDateFilter(f)} className={`px-md py-xs rounded-lg text-label-md font-bold transition-all duration-300 ${dateFilter === f ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container-low text-on-surface-variant border border-outline-variant hover:bg-surface-container-high'}`}>
                            {f === 'today' ? 'Today' : f === 'yesterday' ? 'Yesterday' : 'Last 7 Days'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg mb-xl">
                <div className="bg-white p-lg rounded-2xl card-shadow border border-outline-variant/30 flex flex-col justify-between min-h-[140px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="flex justify-between items-start">
                        <div className="w-10 h-10 bg-primary-container/10 rounded-lg flex items-center justify-center text-primary"><span className="material-symbols-outlined fill-1">payments</span></div>
                        <span className="bg-green-100 text-green-700 px-sm py-xs rounded-full text-[10px] font-bold">₹ {filterLabel}</span>
                    </div>
                    <div className="mt-md">
                        <p className="text-on-surface-variant font-label-md">Payments Collected</p>
                        <h3 className="font-display-lg text-headline-lg text-on-surface">{formatInr(filteredPayments)}</h3>
                    </div>
                </div>
                <div className="bg-white p-lg rounded-2xl card-shadow border border-outline-variant/30 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="flex justify-between items-start">
                        <div className="w-10 h-10 bg-secondary-fixed/30 rounded-lg flex items-center justify-center text-secondary"><span className="material-symbols-outlined fill-1">shopping_cart</span></div>
                        <span className="bg-green-100 text-green-700 px-sm py-xs rounded-full text-[10px] font-bold">Live</span>
                    </div>
                    <div className="mt-md">
                        <p className="text-on-surface-variant font-label-md">Transactions ({filterLabel})</p>
                        <h3 className="font-display-lg text-headline-lg text-on-surface">{filteredCount}</h3>
                    </div>
                </div>
                <div className="bg-white p-lg rounded-2xl card-shadow border border-outline-variant/30 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="flex justify-between items-start">
                        <div className="w-10 h-10 bg-tertiary-container/10 rounded-lg flex items-center justify-center text-tertiary"><span className="material-symbols-outlined fill-1">account_balance_wallet</span></div>
                        <span className="bg-yellow-100 text-yellow-700 px-sm py-xs rounded-full text-[10px] font-bold">{pendingCustomerCount} users</span>
                    </div>
                    <div className="mt-md">
                        <p className="text-on-surface-variant font-label-md">Total Pending Credits</p>
                        <h3 className="font-display-lg text-headline-lg text-error">{formatInr(totalPendingCredits)}</h3>
                    </div>
                </div>
                <div className="bg-primary p-lg rounded-2xl card-shadow border-none flex flex-col justify-between text-on-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="flex justify-between items-start">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white"><span className="material-symbols-outlined fill-1">star</span></div>
                    </div>
                    <div className="mt-md">
                        <p className="text-white/70 font-label-md">Total Customers</p>
                        <h3 className="font-headline-md text-headline-md leading-tight">{customers.length} Accounts</h3>
                        <p className="text-white/50 text-[11px] mt-xs">Registered in system</p>
                    </div>
                </div>
            </div>

            {/* Today's Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-md mb-xl">
                {[
                    { label: 'Credits Given', value: formatInr(filteredCredits), icon: 'trending_up', color: 'text-error' },
                    { label: 'Payments In', value: formatInr(filteredPayments), icon: 'trending_down', color: 'text-green-700' },
                    { label: 'Inventory Value', value: formatInr(totalInv), icon: 'inventory_2', color: 'text-primary' },
                    { label: 'Low Stock Items', value: lowStockProducts.length, icon: 'warning', color: 'text-yellow-600' },
                ].map((item, i) => (
                    <div key={i} className="bg-white p-md rounded-xl border border-outline-variant/30 card-shadow flex items-center gap-md transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                        <div className="w-10 h-10 bg-surface-container-low rounded-lg flex items-center justify-center"><span className={`material-symbols-outlined ${item.color}`}>{item.icon}</span></div>
                        <div><p className="text-[11px] text-on-surface-variant uppercase tracking-wider">{item.label}</p><p className={`font-bold text-lg ${item.color}`}>{item.value}</p></div>
                    </div>
                ))}
            </div>

            {/* Sales Analytics Chart */}
            <div className="bg-white p-xl rounded-2xl card-shadow border border-outline-variant/30 mb-xl transition-all duration-300 hover:shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md mb-lg">
                    <div>
                        <h3 className="font-headline-md text-headline-md text-on-surface">Sales Analytics</h3>
                        <p className="text-on-surface-variant font-body-md">Performance over the last 7 days</p>
                    </div>
                </div>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#c5c5d3" />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip formatter={(v) => formatInr(v)} contentStyle={{ borderRadius: '12px', border: '1px solid #c5c5d3' }} />
                            <Legend />
                            <Bar dataKey="Sales" fill="#22c55e" radius={[6, 6, 0, 0]} />
                            <Bar dataKey="Credits" fill="#ba1a1a" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-lg mb-xl">
                {/* Low Stock Alerts */}
                <div className="col-span-12 lg:col-span-4">
                    <div className="bg-white p-lg rounded-xl border border-outline-variant/30 card-shadow h-full">
                        <h3 className="font-headline-sm text-on-surface mb-md flex items-center gap-sm"><span className="material-symbols-outlined text-yellow-600 fill-1">warning</span>Low Stock Alerts</h3>
                        <div className="space-y-sm">
                            {lowStockProducts.length === 0 && <p className="text-on-surface-variant text-sm">All products well stocked!</p>}
                            {lowStockProducts.map(p => (
                                <div key={p._id} className="flex items-center justify-between p-sm bg-yellow-100/50 border border-yellow-200 rounded-lg">
                                    <div><p className="font-bold text-on-surface">{p.name}</p><p className="text-[11px] text-on-surface-variant">{p.category}</p></div>
                                    <span className="bg-error text-white px-sm py-xs rounded-full text-[10px] font-bold">{p.stockQuantity} left</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Top Selling Products */}
                <div className="col-span-12 lg:col-span-4">
                    <div className="bg-white p-lg rounded-xl border border-outline-variant/30 card-shadow h-full">
                        <h3 className="font-headline-sm text-on-surface mb-md flex items-center gap-sm"><span className="material-symbols-outlined text-primary fill-1">trending_up</span>Top Selling Products</h3>
                        <div className="space-y-sm">
                            {topProducts.length === 0 && <p className="text-on-surface-variant text-sm">No sales data yet.</p>}
                            {topProducts.map(([name, amount], i) => (
                                <div key={name} className="flex items-center justify-between p-sm bg-surface-container-low rounded-lg">
                                    <div className="flex items-center gap-sm"><span className="w-6 h-6 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center text-[11px] font-bold">{i + 1}</span><p className="font-bold text-on-surface">{name}</p></div>
                                    <div className="text-right"><p className="font-bold text-primary">{formatInr(amount)}</p><p className="text-[10px] text-on-surface-variant">{topTotal > 0 ? Math.round((amount / topTotal) * 100) : 0}%</p></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Customers */}
                <div className="col-span-12 lg:col-span-4">
                    <div className="bg-white p-lg rounded-xl border border-outline-variant/30 card-shadow h-full">
                        <h3 className="font-headline-sm text-on-surface mb-md flex items-center gap-sm"><span className="material-symbols-outlined text-secondary fill-1">group</span>Recent Customers</h3>
                        <div className="space-y-sm">
                            {customers.slice(0, 5).map(c => {
                                const m = getCustomerMetrics(c._id);
                                return (
                                    <div key={c._id} className="flex items-center justify-between p-sm bg-surface-container-low rounded-lg">
                                        <div className="flex items-center gap-sm">
                                            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm">{c.name.charAt(0)}</div>
                                            <p className="font-bold text-on-surface">{c.name}</p>
                                        </div>
                                        <span className={`font-bold text-sm ${m.runningBalance > 0 ? 'text-error' : 'text-green-700'}`}>{formatInr(m.runningBalance)}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Transactions Table */}
            <div className="bg-white rounded-xl border border-outline-variant/30 card-shadow overflow-x-auto transition-all duration-300 hover:shadow-lg">
                <div className="p-lg border-b border-outline-variant">
                    <h3 className="font-headline-sm text-on-surface">Recent Transactions</h3>
                </div>
                <table className="w-full text-left min-w-[700px]">
                    <thead className="bg-surface-container-low border-b border-outline-variant">
                        <tr>
                            <th className="px-lg py-md text-outline font-label-md uppercase">Customer</th>
                            <th className="px-lg py-md text-outline font-label-md uppercase">Product</th>
                            <th className="px-lg py-md text-outline font-label-md uppercase">Type</th>
                            <th className="px-lg py-md text-outline font-label-md uppercase text-right">Amount</th>
                            <th className="px-lg py-md text-outline font-label-md uppercase text-right">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant">
                        {recentTx.map(t => {
                            const cust = customers.find(c => c._id === (t.customerId?._id || t.customerId));
                            const prodName = t.items?.length > 0 && t.items[0].productId ? (typeof t.items[0].productId === 'object' ? t.items[0].productId.name : '-') : '-';
                            return (
                                <tr key={t._id} className="hover:bg-surface-container-low transition-colors">
                                    <td className="px-lg py-md font-bold">{cust?.name || 'Unknown'}</td>
                                    <td className="px-lg py-md text-on-surface-variant">{prodName}</td>
                                    <td className="px-lg py-md"><span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${t.type === 'Credit' ? 'bg-error-container text-on-error-container' : 'bg-green-100 text-green-800'}`}>{t.type}</span></td>
                                    <td className={`px-lg py-md text-right font-bold ${t.type === 'Credit' ? 'text-error' : 'text-green-700'}`}>{t.type === 'Credit' ? '+' : '-'}{formatInr(t.amount)}</td>
                                    <td className="px-lg py-md text-right text-on-surface-variant text-sm">{formatDate(t.date)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const Products = ({ products, fetchData }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const handleAdd = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        await api.post('/products', Object.fromEntries(fd));
        setIsOpen(false);
        fetchData();
    };

    const totalInv = products.reduce((sum, p) => sum + (p.stockQuantity * p.unitPrice), 0);

    return (
        <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-lg mb-xl">
                <div>
                    <h2 className="font-headline-lg text-headline-lg text-primary mb-xs">Products & Inventory</h2>
                    <p className="text-body-md text-on-surface-variant">Manage your Kirana store inventory securely via MongoDB.</p>
                </div>
                <button onClick={() => setIsOpen(true)} className="flex items-center gap-sm px-lg py-md bg-primary text-white rounded-xl font-bold custom-shadow hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-300">
                    <span className="material-symbols-outlined">add</span> Add Product
                </button>
            </div>
            
            <div className="grid grid-cols-12 gap-lg">
                <div className="col-span-12 lg:col-span-9 space-y-lg">
                    <div className="bg-white rounded-xl border border-outline-variant custom-shadow overflow-x-auto transition-all duration-300 hover:shadow-lg">
                        <table className="w-full text-left border-collapse min-w-[700px]">
                            <thead className="bg-surface-container-low border-b border-outline-variant">
                                <tr>
                                    <th className="px-lg py-md text-label-md text-on-surface-variant uppercase tracking-widest">Product Name</th>
                                    <th className="px-lg py-md text-label-md text-on-surface-variant uppercase tracking-widest">Code</th>
                                    <th className="px-lg py-md text-label-md text-on-surface-variant uppercase tracking-widest text-center">Category</th>
                                    <th className="px-lg py-md text-label-md text-on-surface-variant uppercase tracking-widest text-center">Stock</th>
                                    <th className="px-lg py-md text-label-md text-on-surface-variant uppercase tracking-widest text-right">Price</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant">
                                {products.map((item) => (
                                    <tr key={item._id} className="hover:bg-surface-container-low transition-colors duration-300 group">
                                        <td className="px-lg py-md font-bold group-hover:text-primary transition-colors">{item.name}</td>
                                        <td className="px-lg py-md text-body-sm text-outline">{item.productCode}</td>
                                        <td className="px-lg py-md text-center">
                                            <span className="px-sm py-xs bg-surface-container-highest text-primary font-bold text-label-sm rounded-lg">{item.category}</span>
                                        </td>
                                        <td className="px-lg py-md text-center">
                                            <span className={`px-sm py-xs font-bold text-label-sm rounded-full ${item.stockQuantity < 20 ? 'bg-error text-white' : 'bg-secondary-container text-on-secondary-container'}`}>
                                                {item.stockQuantity} Items
                                            </span>
                                        </td>
                                        <td className="px-lg py-md text-right font-bold">{formatInr(item.unitPrice)}</td>
                                    </tr>
                                ))}
                                {products.length === 0 && <tr><td colSpan="5" className="text-center p-xl">No products in database. Run node seed.js.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
                <aside className="col-span-12 lg:col-span-3 space-y-lg">
                    <div className="bg-primary-container text-on-primary-container p-lg rounded-2xl custom-shadow relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <p className="text-label-md uppercase tracking-wider opacity-80 mb-sm">Total Inventory Value</p>
                        <h3 className="font-headline-lg text-headline-lg mb-md">{formatInr(totalInv)}</h3>
                    </div>
                </aside>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
                        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="bg-surface-container-lowest rounded-2xl p-xl w-full max-w-[450px] min-w-[320px] shrink-0 shadow-2xl border border-outline-variant m-auto">
                            <h3 className="font-headline-md text-headline-md text-primary mb-md">Add New Product</h3>
                            <form onSubmit={handleAdd} className="space-y-md">
                                <div><label className="block font-bold mb-1">Name</label><input required name="name" className="w-full p-sm bg-surface-container-low border border-outline-variant rounded-lg" /></div>
                                <div><label className="block font-bold mb-1">Category</label><input required name="category" className="w-full p-sm bg-surface-container-low border border-outline-variant rounded-lg" /></div>
                                <div><label className="block font-bold mb-1">Product Code</label><input required name="productCode" className="w-full p-sm bg-surface-container-low border border-outline-variant rounded-lg" /></div>
                                <div className="grid grid-cols-2 gap-sm">
                                    <div><label className="block font-bold mb-1">Stock</label><input required type="number" name="stockQuantity" className="w-full p-sm bg-surface-container-low border border-outline-variant rounded-lg" /></div>
                                    <div><label className="block font-bold mb-1">Price (₹)</label><input required type="number" name="unitPrice" className="w-full p-sm bg-surface-container-low border border-outline-variant rounded-lg" /></div>
                                </div>
                                <div className="flex gap-sm mt-lg">
                                    <button type="button" onClick={() => setIsOpen(false)} className="flex-1 py-sm bg-surface-container-highest font-bold rounded-lg hover:bg-outline-variant">Cancel</button>
                                    <button type="submit" className="flex-1 py-sm bg-primary text-on-primary font-bold rounded-lg hover:opacity-90">Save</button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Customers = ({ customers, transactions, products, getCustomerMetrics, fetchData }) => {
    const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
    const [isLogTransactionOpen, setIsLogTransactionOpen] = useState(false);
    const [historyModalCustomerId, setHistoryModalCustomerId] = useState(null);

    let globalActiveCreditUsers = 0;
    let globalOutstandingCredit = 0;
    customers.forEach(c => {
        const metrics = getCustomerMetrics(c._id);
        if (metrics.runningBalance > 0) {
            globalActiveCreditUsers++;
            globalOutstandingCredit += metrics.runningBalance;
        }
    });

    const handleAddCustomer = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        await api.post('/customers', Object.fromEntries(fd));
        setIsAddCustomerOpen(false);
        fetchData();
    };

    const handleLogTransaction = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        
        const payload = {
            customerId: fd.get('customerId'),
            type: fd.get('type'),
            amount: Number(fd.get('amount')),
            notes: fd.get('notes'),
            date: fd.get('date'),
            items: fd.get('productId') ? [{ productId: fd.get('productId'), quantity: 1 }] : []
        };
        await api.post('/transactions', payload);
        setIsLogTransactionOpen(false);
        fetchData();
    };

    return (
        <div className="animate-fade-in relative">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-md mb-xl">
                <div>
                    <h2 className="font-headline-lg text-headline-lg text-primary">Customers & Ledger</h2>
                    <p className="text-on-surface-variant mt-xs">Monitor client relationships and manage credit risk exposure dynamically.</p>
                </div>
                <div className="flex gap-md">
                    <button onClick={() => setIsLogTransactionOpen(true)} className="flex items-center gap-sm bg-surface-container-highest text-primary border border-primary/20 px-lg py-sm rounded-lg font-bold hover:bg-primary hover:text-white hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-300">
                        <span className="material-symbols-outlined">receipt_long</span> Log Transaction
                    </button>
                    <button onClick={() => setIsAddCustomerOpen(true)} className="flex items-center gap-sm bg-primary text-white px-lg py-sm rounded-lg font-bold hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-300">
                        <span className="material-symbols-outlined">person_add</span> Add Customer
                    </button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-xl">
                <div className="bg-white p-lg border border-outline-variant rounded-xl flex flex-col justify-between h-40 card-shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <span className="font-label-md text-outline uppercase tracking-wider">Total Customers</span>
                    <h3 className="font-display-lg text-4xl font-bold text-primary">{customers.length}</h3>
                </div>
                <div className="bg-white p-lg border border-outline-variant rounded-xl flex flex-col justify-between h-40 card-shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <span className="font-label-md text-outline uppercase tracking-wider">Active Credit Users</span>
                    <h3 className="font-display-lg text-4xl font-bold text-on-surface">{globalActiveCreditUsers}</h3>
                </div>
                <div className="bg-error-container/10 border border-error/20 p-lg rounded-xl flex flex-col justify-between h-40 card-shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <span className="font-label-md text-error uppercase tracking-wider">Outstanding Credit</span>
                    <h3 className="font-display-lg text-4xl font-bold text-error">{formatInr(globalOutstandingCredit)}</h3>
                </div>
            </div>

            <div className="bg-white border border-outline-variant rounded-xl overflow-x-auto card-shadow transition-all duration-300 hover:shadow-lg">
                <table className="w-full text-left min-w-[900px]">
                    <thead className="bg-surface-bright border-b border-outline-variant">
                        <tr>
                            <th className="px-lg py-md text-outline font-label-md uppercase">Customer</th>
                            <th className="px-lg py-md text-outline font-label-md uppercase">Total Credit</th>
                            <th className="px-lg py-md text-outline font-label-md uppercase">Total Paid</th>
                            <th className="px-lg py-md text-outline font-label-md uppercase">Running Balance</th>
                            <th className="px-lg py-md text-outline font-label-md uppercase">Last Transaction</th>
                            <th className="px-lg py-md text-right text-outline font-label-md uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant">
                        {customers.map((c) => {
                            const metrics = getCustomerMetrics(c._id);
                            const hasPending = metrics.runningBalance > 0;

                            return (
                                <tr key={c._id} className="group hover:bg-surface-container-lowest transition-colors duration-300">
                                    <td className="px-lg py-lg">
                                        <div className="flex items-center gap-md">
                                            <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold transition-transform duration-300 group-hover:scale-110">{c.name.charAt(0)}</div>
                                            <div>
                                                <p className="font-bold group-hover:text-primary transition-colors duration-300">{c.name}</p>
                                                <p className="text-body-sm text-outline">{c.phone}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-lg py-lg font-semibold text-on-surface-variant">{formatInr(metrics.totalCredit)}</td>
                                    <td className="px-lg py-lg font-semibold text-green-700">{formatInr(metrics.totalPaid)}</td>
                                    <td className="px-lg py-lg">
                                        <p className={`font-bold text-lg ${hasPending ? 'text-error' : 'text-green-700'}`}>
                                            {formatInr(metrics.runningBalance)}
                                        </p>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold ${hasPending ? 'bg-error-container text-on-error-container' : 'bg-surface-container-highest text-outline'}`}>
                                            {hasPending ? 'Pending Dues' : 'Cleared'}
                                        </span>
                                    </td>
                                    <td className="px-lg py-lg text-on-surface-variant font-body-sm">
                                        {formatDate(metrics.lastTransactionDate)}
                                    </td>
                                    <td className="px-lg py-lg text-right">
                                        <button onClick={() => setHistoryModalCustomerId(c._id)} className="px-md py-sm bg-surface-container-low border border-outline-variant text-primary rounded-lg text-body-sm font-bold hover:bg-primary hover:text-white active:scale-95 transition-all duration-300 shadow-sm">
                                            View History
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        {customers.length === 0 && (
                            <tr><td colSpan="6" className="text-center py-xl text-on-surface-variant">No customers found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            <AnimatePresence>
            {isAddCustomerOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
                    <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-surface-container-lowest rounded-2xl p-xl w-full max-w-[450px] min-w-[320px] shrink-0 shadow-2xl border border-outline-variant m-auto">
                        <h3 className="font-headline-md text-headline-md text-primary mb-md">Add New Customer</h3>
                        <form onSubmit={handleAddCustomer} className="space-y-md">
                            <div><label className="block font-bold mb-xs">Customer Name</label><input required name="name" className="w-full p-sm bg-surface-container-low border border-outline-variant rounded-lg" /></div>
                            <div><label className="block font-bold mb-xs">Phone Number</label><input required name="phone" className="w-full p-sm bg-surface-container-low border border-outline-variant rounded-lg" /></div>
                            <div><label className="block font-bold mb-xs">Opening Balance (Optional)</label><input name="openingBalance" type="number" defaultValue="0" className="w-full p-sm bg-surface-container-low border border-outline-variant rounded-lg" /></div>
                            <div className="flex gap-sm mt-lg">
                                <button type="button" onClick={() => setIsAddCustomerOpen(false)} className="flex-1 py-sm bg-surface-container-highest font-bold rounded-lg hover:bg-outline-variant">Cancel</button>
                                <button type="submit" className="flex-1 py-sm bg-primary text-on-primary font-bold rounded-lg hover:opacity-90">Save Customer</button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}

            {isLogTransactionOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
                    <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-surface-container-lowest rounded-2xl p-xl w-full max-w-[450px] min-w-[320px] shrink-0 shadow-2xl border border-outline-variant m-auto">
                        <h3 className="font-headline-md text-headline-md text-primary mb-md">Log Transaction</h3>
                        <form onSubmit={handleLogTransaction} className="space-y-md">
                            <div>
                                <label className="block font-bold mb-xs">Select Customer</label>
                                <select required name="customerId" className="w-full p-sm bg-surface-container-low border border-outline-variant rounded-lg">
                                    <option value="">-- Choose Customer --</option>
                                    {customers.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block font-bold mb-xs">Grocery Product (Optional)</label>
                                <select name="productId" className="w-full p-sm bg-surface-container-low border border-outline-variant rounded-lg">
                                    <option value="">-- None (Cash Tx) --</option>
                                    {products.map(p => <option key={p._id} value={p._id}>{p.name} - {formatInr(p.unitPrice)}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block font-bold mb-xs">Transaction Type</label>
                                <div className="flex gap-sm">
                                    <label className="flex-1 flex items-center gap-2 p-sm border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container-low"><input type="radio" name="type" value="Credit" required className="text-primary" /><span className="font-bold text-error">Give Credit (Dues)</span></label>
                                    <label className="flex-1 flex items-center gap-2 p-sm border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container-low"><input type="radio" name="type" value="Payment" className="text-primary" /><span className="font-bold text-green-700">Receive Payment</span></label>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-sm">
                                <div><label className="block font-bold mb-xs">Amount</label><input required name="amount" type="number" min="1" className="w-full p-sm bg-surface-container-low border border-outline-variant rounded-lg" /></div>
                                <div><label className="block font-bold mb-xs">Date</label><input required name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full p-sm bg-surface-container-low border border-outline-variant rounded-lg" /></div>
                            </div>
                            <div><label className="block font-bold mb-xs">Notes</label><input name="notes" className="w-full p-sm bg-surface-container-low border border-outline-variant rounded-lg" /></div>
                            <div className="flex gap-sm mt-lg">
                                <button type="button" onClick={() => setIsLogTransactionOpen(false)} className="flex-1 py-sm bg-surface-container-highest font-bold rounded-lg hover:bg-outline-variant">Cancel</button>
                                <button type="submit" className="flex-1 py-sm bg-primary text-on-primary font-bold rounded-lg hover:opacity-90">Save Transaction</button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
            </AnimatePresence>

            {/* View History Section */}
            {historyModalCustomerId && (() => {
                const c = customers.find(x => x._id === historyModalCustomerId);
                const tList = transactions.filter(t => t.customerId?._id === historyModalCustomerId || t.customerId === historyModalCustomerId).sort((a,b) => new Date(b.date) - new Date(a.date));
                const metrics = getCustomerMetrics(historyModalCustomerId);

                return (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-xl bg-white border border-outline-variant rounded-xl card-shadow flex flex-col">
                        <div className="p-lg border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest rounded-t-xl">
                            <div>
                                <h3 className="font-headline-md text-headline-md text-primary">{c?.name}'s Ledger</h3>
                                <p className="text-body-sm text-on-surface-variant">Running Balance: <span className={`font-bold ${metrics.runningBalance > 0 ? 'text-error' : 'text-green-700'}`}>{formatInr(metrics.runningBalance)}</span></p>
                            </div>
                            <button onClick={() => setHistoryModalCustomerId(null)} className="w-8 h-8 rounded-full bg-surface-container hover:bg-outline-variant flex items-center justify-center transition-colors">
                                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">close</span>
                            </button>
                        </div>
                        
                        <div className="p-0 overflow-x-auto bg-surface-container-low/30 rounded-b-xl">
                            <table className="w-full text-left min-w-[600px]">
                                <thead className="bg-surface-container-low border-b border-outline-variant shadow-sm">
                                    <tr>
                                        <th className="px-lg py-sm text-outline font-label-md uppercase">Date</th>
                                        <th className="px-lg py-sm text-outline font-label-md uppercase">Type</th>
                                        <th className="px-lg py-sm text-outline font-label-md uppercase">Items/Notes</th>
                                        <th className="px-lg py-sm text-right text-outline font-label-md uppercase">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant bg-white">
                                    {tList.map((t) => (
                                        <tr key={t._id} className="hover:bg-surface-container-lowest transition-colors">
                                            <td className="px-lg py-md text-on-surface-variant font-body-sm">{formatDate(t.date)}</td>
                                            <td className="px-lg py-md">
                                                <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${t.type === 'Credit' ? 'bg-error-container text-on-error-container' : 'bg-green-100 text-green-800'}`}>{t.type}</span>
                                            </td>
                                            <td className="px-lg py-md text-on-surface font-body-sm">
                                                {t.items?.length > 0 && t.items[0].productId ? <span className="mr-2 font-bold text-primary">[{t.items[0].productId.name}]</span> : null}
                                                {t.notes || '-'}
                                            </td>
                                            <td className={`px-lg py-md text-right font-bold ${t.type === 'Credit' ? 'text-error' : 'text-green-700'}`}>
                                                {t.type === 'Credit' ? '+' : '-'}{formatInr(t.amount)}
                                            </td>
                                        </tr>
                                    ))}
                                    {tList.length === 0 && <tr><td colSpan="4" className="text-center py-xl text-on-surface-variant">No transactions found.</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                );
            })()}

        </div>
    );
};

const Reports = ({ customers, transactions, products, getCustomerMetrics }) => {
    const [activeSection, setActiveSection] = useState(null);

    const totalCredits = transactions.filter(t => t.type === 'Credit').reduce((s, t) => s + Number(t.amount), 0);
    const totalPayments = transactions.filter(t => t.type === 'Payment').reduce((s, t) => s + Number(t.amount), 0);
    const totalInv = products.reduce((s, p) => s + (p.stockQuantity * p.unitPrice), 0);
    const lowStock = products.filter(p => p.stockQuantity < 20);

    const generatePDF = () => {
        const doc = new jsPDF();
        const primaryColor = [36, 56, 140];

        // Header
        doc.setFillColor(...primaryColor);
        doc.rect(0, 0, 210, 35, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.text("MerchantIQ Business Report", 14, 18);
        doc.setFontSize(10);
        doc.text(`Gorakshaknath Merchants | Generated: ${new Date().toLocaleString('en-IN')}`, 14, 28);
        doc.setTextColor(0, 0, 0);

        // Dashboard Summary
        doc.setFontSize(14);
        doc.text("Dashboard Summary", 14, 45);
        doc.autoTable({
            startY: 50, head: [['Metric', 'Value']],
            body: [
                ['Total Customers', customers.length.toString()],
                ['Total Products', products.length.toString()],
                ['Total Transactions', transactions.length.toString()],
                ['Total Credits Given', formatInr(totalCredits)],
                ['Total Payments Collected', formatInr(totalPayments)],
                ['Pending Dues', formatInr(totalCredits - totalPayments)],
                ['Inventory Value', formatInr(totalInv)],
                ['Low Stock Items', lowStock.length.toString()],
            ],
            theme: 'grid', headStyles: { fillColor: primaryColor }
        });

        // Customer Balances
        doc.addPage();
        doc.setFontSize(14);
        doc.text("Customer Balances Report", 14, 20);
        doc.autoTable({
            startY: 26, head: [['Customer', 'Phone', 'Credit', 'Paid', 'Balance']],
            body: customers.map(c => {
                const m = getCustomerMetrics(c._id);
                return [c.name, c.phone, formatInr(m.totalCredit), formatInr(m.totalPaid), formatInr(m.runningBalance)];
            }),
            theme: 'grid', headStyles: { fillColor: primaryColor }
        });

        // Inventory
        doc.addPage();
        doc.setFontSize(14);
        doc.text("Inventory Report", 14, 20);
        doc.autoTable({
            startY: 26, head: [['Product', 'Code', 'Category', 'Stock', 'Price', 'Value']],
            body: products.map(p => [p.name, p.productCode, p.category, p.stockQuantity.toString(), formatInr(p.unitPrice), formatInr(p.stockQuantity * p.unitPrice)]),
            theme: 'grid', headStyles: { fillColor: primaryColor }
        });

        // Transactions
        doc.addPage();
        doc.setFontSize(14);
        doc.text("Transaction History (Last 50)", 14, 20);
        doc.autoTable({
            startY: 26, head: [['Date', 'Customer', 'Type', 'Amount', 'Notes']],
            body: transactions.slice(0, 50).map(t => {
                const cust = customers.find(c => c._id === (t.customerId?._id || t.customerId));
                return [formatDate(t.date), cust?.name || '-', t.type, formatInr(t.amount), t.notes || '-'];
            }),
            theme: 'grid', headStyles: { fillColor: primaryColor }
        });

        doc.save("merchantiq_full_report.pdf");
    };

    const renderSubReport = () => {
        if (!activeSection) return null;
        if (activeSection === 'Sales') {
            const totalSales = totalPayments;
            const todayTx = transactions.filter(t => new Date(t.date).toDateString() === new Date().toDateString());
            return (
                <div className="space-y-md">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-md">
                        <div className="p-md bg-surface-container-low rounded-lg"><p className="text-[11px] text-on-surface-variant uppercase">Total Revenue</p><p className="text-xl font-bold text-primary">{formatInr(totalSales)}</p></div>
                        <div className="p-md bg-surface-container-low rounded-lg"><p className="text-[11px] text-on-surface-variant uppercase">Today's Sales</p><p className="text-xl font-bold text-green-700">{formatInr(todayTx.filter(t => t.type === 'Payment').reduce((s, t) => s + Number(t.amount), 0))}</p></div>
                        <div className="p-md bg-surface-container-low rounded-lg"><p className="text-[11px] text-on-surface-variant uppercase">Total Transactions</p><p className="text-xl font-bold text-on-surface">{transactions.length}</p></div>
                    </div>
                </div>
            );
        }
        if (activeSection === 'Inventory') {
            return (
                <div className="space-y-md">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-md mb-md">
                        <div className="p-md bg-surface-container-low rounded-lg"><p className="text-[11px] text-on-surface-variant uppercase">Inventory Value</p><p className="text-xl font-bold text-primary">{formatInr(totalInv)}</p></div>
                        <div className="p-md bg-surface-container-low rounded-lg"><p className="text-[11px] text-on-surface-variant uppercase">Total Products</p><p className="text-xl font-bold text-on-surface">{products.length}</p></div>
                        <div className="p-md bg-surface-container-low rounded-lg"><p className="text-[11px] text-on-surface-variant uppercase">Low Stock</p><p className="text-xl font-bold text-error">{lowStock.length} items</p></div>
                    </div>
                    <table className="w-full text-left"><thead className="bg-surface-container-low border-b border-outline-variant"><tr><th className="px-md py-sm text-outline text-sm uppercase">Product</th><th className="px-md py-sm text-outline text-sm uppercase text-center">Stock</th><th className="px-md py-sm text-outline text-sm uppercase text-right">Value</th></tr></thead>
                    <tbody className="divide-y divide-outline-variant">{products.map(p => (<tr key={p._id} className="hover:bg-surface-container-low"><td className="px-md py-sm font-bold">{p.name}</td><td className={`px-md py-sm text-center font-bold ${p.stockQuantity < 20 ? 'text-error' : ''}`}>{p.stockQuantity}</td><td className="px-md py-sm text-right">{formatInr(p.stockQuantity * p.unitPrice)}</td></tr>))}</tbody></table>
                </div>
            );
        }
        if (activeSection === 'Customers') {
            return (
                <div className="space-y-md">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-md mb-md">
                        <div className="p-md bg-surface-container-low rounded-lg"><p className="text-[11px] text-on-surface-variant uppercase">Total Customers</p><p className="text-xl font-bold text-primary">{customers.length}</p></div>
                        <div className="p-md bg-surface-container-low rounded-lg"><p className="text-[11px] text-on-surface-variant uppercase">With Pending Dues</p><p className="text-xl font-bold text-error">{customers.filter(c => getCustomerMetrics(c._id).runningBalance > 0).length}</p></div>
                        <div className="p-md bg-surface-container-low rounded-lg"><p className="text-[11px] text-on-surface-variant uppercase">Cleared</p><p className="text-xl font-bold text-green-700">{customers.filter(c => getCustomerMetrics(c._id).runningBalance <= 0).length}</p></div>
                    </div>
                    <table className="w-full text-left"><thead className="bg-surface-container-low border-b border-outline-variant"><tr><th className="px-md py-sm text-outline text-sm uppercase">Name</th><th className="px-md py-sm text-outline text-sm uppercase">Phone</th><th className="px-md py-sm text-outline text-sm uppercase text-right">Balance</th></tr></thead>
                    <tbody className="divide-y divide-outline-variant">{customers.map(c => { const m = getCustomerMetrics(c._id); return (<tr key={c._id} className="hover:bg-surface-container-low"><td className="px-md py-sm font-bold">{c.name}</td><td className="px-md py-sm text-on-surface-variant">{c.phone}</td><td className={`px-md py-sm text-right font-bold ${m.runningBalance > 0 ? 'text-error' : 'text-green-700'}`}>{formatInr(m.runningBalance)}</td></tr>); })}</tbody></table>
                </div>
            );
        }
        if (activeSection === 'Financials') {
            return (
                <div className="space-y-md">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
                        <div className="p-md bg-surface-container-low rounded-lg"><p className="text-[11px] text-on-surface-variant uppercase">Total Credits</p><p className="text-xl font-bold text-error">{formatInr(totalCredits)}</p></div>
                        <div className="p-md bg-surface-container-low rounded-lg"><p className="text-[11px] text-on-surface-variant uppercase">Payments Collected</p><p className="text-xl font-bold text-green-700">{formatInr(totalPayments)}</p></div>
                        <div className="p-md bg-surface-container-low rounded-lg"><p className="text-[11px] text-on-surface-variant uppercase">Pending Dues</p><p className="text-xl font-bold text-yellow-600">{formatInr(totalCredits - totalPayments)}</p></div>
                        <div className="p-md bg-surface-container-low rounded-lg"><p className="text-[11px] text-on-surface-variant uppercase">Recovery Rate</p><p className="text-xl font-bold text-primary">{totalCredits > 0 ? Math.round((totalPayments / totalCredits) * 100) : 0}%</p></div>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-end mb-xl">
                <div>
                    <h2 className="font-headline-lg text-headline-lg text-primary mb-xs">Business Reports</h2>
                    <p className="text-body-lg text-on-surface-variant">Generate dynamic PDFs and view sub-reports.</p>
                </div>
                <button onClick={generatePDF} className="flex items-center gap-sm bg-primary text-white px-lg py-sm rounded-lg font-bold hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-300">
                    <span className="material-symbols-outlined">picture_as_pdf</span> Export PDF
                </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-lg mb-xl">
                {['Sales', 'Inventory', 'Customers', 'Financials'].map((cat, i) => (
                    <div key={cat} onClick={() => setActiveSection(activeSection === cat ? null : cat)} className={`p-md rounded-xl border transition-all duration-300 cursor-pointer group hover:-translate-y-1 ${activeSection === cat ? 'bg-primary border-primary shadow-lg' : 'bg-surface-container-low border-outline-variant hover:border-primary hover:shadow-md'}`}>
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-md transition-colors duration-300 shadow-sm ${activeSection === cat ? 'bg-white text-primary' : 'bg-surface text-primary group-hover:bg-primary group-hover:text-white'}`}>
                            <span className="material-symbols-outlined">{['payments', 'inventory', 'person_add', 'account_balance'][i]}</span>
                        </div>
                        <h3 className={`font-headline-sm mb-xs transition-colors duration-300 ${activeSection === cat ? 'text-white' : 'text-on-surface group-hover:text-primary'}`}>{cat}</h3>
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {activeSection && (
                    <motion.div key={activeSection} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white border border-outline-variant rounded-xl p-xl shadow-lg">
                        <h3 className="text-xl font-bold text-primary mb-lg">{activeSection} Detailed Report</h3>
                        {renderSubReport()}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Settings = () => {
    const { theme, setTheme } = useStore();
    return (
        <div className="animate-fade-in pb-20">
            <div className="flex flex-col gap-xs mb-xl">
                <h1 className="font-headline-lg text-headline-lg text-on-surface">Settings</h1>
                <p className="text-on-surface-variant font-body-md">Manage your MerchantIQ store preferences and account security.</p>
            </div>
            <div className="grid grid-cols-12 gap-lg">
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-lg">
                    {/* Theme */}
                    <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
                        <div className="flex items-center gap-md mb-lg">
                            <span className="material-symbols-outlined text-primary bg-primary-fixed p-sm rounded-lg shadow-sm">palette</span>
                            <h2 className="font-headline-sm">Theme Preferences</h2>
                        </div>
                        <div className="flex gap-md">
                            <button onClick={() => setTheme('light')} className={`flex-1 p-md rounded-xl border-2 transition-all ${theme === 'light' ? 'border-primary bg-primary-fixed/20 shadow-md' : 'border-outline-variant hover:border-primary'}`}>
                                <span className="material-symbols-outlined text-yellow-500 mb-sm">light_mode</span>
                                <p className="font-bold">Light Mode</p>
                                <p className="text-[11px] text-on-surface-variant">Clean, bright interface</p>
                            </button>
                            <button onClick={() => setTheme('dark')} className={`flex-1 p-md rounded-xl border-2 transition-all ${theme === 'dark' ? 'border-primary bg-primary-fixed/20 shadow-md' : 'border-outline-variant hover:border-primary'}`}>
                                <span className="material-symbols-outlined text-indigo-400 mb-sm">dark_mode</span>
                                <p className="font-bold">Dark Mode</p>
                                <p className="text-[11px] text-on-surface-variant">Easy on the eyes</p>
                            </button>
                        </div>
                    </section>

                    {/* Profile */}
                    <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
                        <div className="flex items-center gap-md mb-lg">
                            <span className="material-symbols-outlined text-primary bg-primary-fixed p-sm rounded-lg shadow-sm">person</span>
                            <h2 className="font-headline-sm">Profile Settings</h2>
                        </div>
                        <div className="space-y-md">
                            <div className="flex items-center gap-md p-md bg-surface-container-low rounded-lg">
                                <img alt="Profile" className="w-14 h-14 rounded-full object-cover" src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=150&q=80" />
                                <div><p className="font-bold text-on-surface">Gorakshaknath</p><p className="text-body-sm text-on-surface-variant">Merchant / Store Owner</p><p className="text-[11px] text-outline">contact@gorakshaknathmerchants.in</p></div>
                            </div>
                        </div>
                    </section>

                    {/* Store Information */}
                    <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
                        <div className="flex items-center gap-md mb-lg">
                            <span className="material-symbols-outlined text-primary bg-primary-fixed p-sm rounded-lg shadow-sm">store</span>
                            <h2 className="font-headline-sm">Store Information</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-md">
                            <div className="p-md bg-surface-container-low rounded-lg"><p className="text-[11px] text-on-surface-variant uppercase">Store Name</p><p className="font-bold">Gorakshaknath General Store</p></div>
                            <div className="p-md bg-surface-container-low rounded-lg"><p className="text-[11px] text-on-surface-variant uppercase">Location</p><p className="font-bold">Maharashtra, India</p></div>
                            <div className="p-md bg-surface-container-low rounded-lg"><p className="text-[11px] text-on-surface-variant uppercase">GST Number</p><p className="font-bold">27AABCG1234F1ZH</p></div>
                            <div className="p-md bg-surface-container-low rounded-lg"><p className="text-[11px] text-on-surface-variant uppercase">Contact</p><p className="font-bold">+91 98765 43210</p></div>
                        </div>
                    </section>

                    {/* Export Preferences */}
                    <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
                        <div className="flex items-center gap-md mb-lg">
                            <span className="material-symbols-outlined text-primary bg-primary-fixed p-sm rounded-lg shadow-sm">download</span>
                            <h2 className="font-headline-sm">Data Export Preferences</h2>
                        </div>
                        <div className="space-y-sm">
                            {['Include Customer Balances in PDF', 'Include Inventory Data in PDF', 'Include Transaction History in PDF'].map((label, i) => (
                                <div key={i} className="flex items-center justify-between p-md bg-surface-container-low rounded-lg">
                                    <p className="font-bold text-on-surface">{label}</p>
                                    <div className="w-11 h-6 bg-primary rounded-full flex items-center px-1"><span className="w-4 h-4 bg-white rounded-full ml-auto" /></div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

// --- App Component ---

const App = () => {
    const { isAuthenticated, theme } = useStore();
    const [activePage, setActivePage] = useState('dashboard');
    const [customers, setCustomers] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [products, setProducts] = useState([]);

    const fetchData = async () => {
        try {
            const [cRes, tRes, pRes] = await Promise.all([
                api.get('/customers'),
                api.get('/transactions'),
                api.get('/products')
            ]);
            setCustomers(cRes.data);
            setTransactions(tRes.data);
            setProducts(pRes.data);
        } catch (err) {
            console.error("Backend fetch error. Is server running?", err);
        }
    };

    useEffect(() => {
        if (isAuthenticated) fetchData();
    }, [isAuthenticated]);

    useEffect(() => {
        if (theme === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [theme]);

    const getCustomerMetrics = (customerId) => {
        const customer = customers.find(c => c._id === customerId);
        const custTransactions = transactions.filter(t => t.customerId?._id === customerId || t.customerId === customerId);
        
        let totalCredit = customer?.openingBalance || 0;
        let totalPaid = 0;
        let lastTransactionDate = customer?.createdAt || null;
        
        custTransactions.forEach(t => {
            if (t.type === 'Credit') totalCredit += Number(t.amount);
            if (t.type === 'Payment') totalPaid += Number(t.amount);
            if (!lastTransactionDate || new Date(t.date) > new Date(lastTransactionDate)) {
                lastTransactionDate = t.date;
            }
        });

        const runningBalance = totalCredit - totalPaid;
        return { totalCredit, totalPaid, runningBalance, lastTransactionDate };
    };

    if (!isAuthenticated) return <Login />;

    const renderPage = () => {
        switch(activePage) {
            case 'dashboard': return <Dashboard customers={customers} transactions={transactions} products={products} getCustomerMetrics={getCustomerMetrics} />;
            case 'products': return <Products products={products} fetchData={fetchData} />;
            case 'customers': return <Customers customers={customers} transactions={transactions} products={products} getCustomerMetrics={getCustomerMetrics} fetchData={fetchData} />;
            case 'reports': return <Reports customers={customers} transactions={transactions} products={products} getCustomerMetrics={getCustomerMetrics} />;
            case 'settings': return <Settings />;
            default: return <Dashboard customers={customers} transactions={transactions} products={products} getCustomerMetrics={getCustomerMetrics} />;
        }
    };

    return (
        <MainWrapper activePage={activePage} setActivePage={setActivePage} transactions={transactions} customers={customers}>
            {renderPage()}
        </MainWrapper>
    );
};

export default App;
