import React, { useState, useEffect } from 'react';

// --- Helpers ---
const formatInr = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
};

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const d = new Date(dateString);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

// --- Shared Components ---

const Sidebar = ({ activePage, setActivePage }) => {
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
                <button className="w-full text-left flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-high transition-all duration-300 hover:scale-[1.02] active:scale-95 rounded-lg">
                    <span className="material-symbols-outlined">help</span>
                    <span className="font-body-md">Help</span>
                </button>
                <button className="w-full text-left flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-high transition-all duration-300 hover:scale-[1.02] active:scale-95 rounded-lg">
                    <span className="material-symbols-outlined text-error">logout</span>
                    <span className="font-body-md text-error">Logout</span>
                </button>
            </div>
        </aside>
    );
};

const Header = () => {
    return (
        <header className="fixed top-0 right-0 w-[calc(100%-256px)] z-40 bg-surface/80 backdrop-blur-md border-b border-outline-variant shadow-sm flex justify-between items-center px-lg py-md h-20 animate-fade-in">
            <div className="flex items-center gap-md bg-surface-container-low border border-outline-variant px-md py-sm rounded-full w-96 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent focus-within:shadow-md">
                <span className="material-symbols-outlined text-outline">search</span>
                <input className="bg-transparent border-none focus:ring-0 text-body-md w-full focus:outline-none" placeholder="Search data, reports, or metrics..." type="text"/>
            </div>
            <div className="flex items-center gap-lg">
                <div className="flex items-center gap-md border-r border-outline-variant pr-lg text-on-surface-variant">
                    <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-all duration-300 hover:scale-110 active:scale-95">notifications</span>
                    <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-all duration-300 hover:scale-110 active:scale-95">history</span>
                    <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-all duration-300 hover:scale-110 active:scale-95">chat</span>
                </div>
                <div className="flex items-center gap-sm cursor-pointer active:scale-95 transition-all duration-300 hover:opacity-80">
                    <img alt="User Profile" className="w-8 h-8 rounded-full bg-surface-container-highest object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZxtEhXHiX4y8zis2EPAHoeHRQ8KG2xvaQ9N4pjN7nOdGpBiginzn5AOSgmEhce868s2qiq_8gEPaAIJuQidZhnQ40TIeH5cyOmFwoJwZk9tSGgypbGCRRve6scjIOoONwVQAkiYe2Muziz-O1aVxjHd-jXCISGu8My30MMd1yLxH-vl9TQlhhPA135HRiHija4fu3LkFuz69TGN4I3p1n_pEuln1_7wC4o5HgmnJbZH4V7Cs4Y9y_mFq0K-Fw_k9LE7VgHsxowBuS"/>
                    <div className="flex flex-col">
                        <span className="font-label-md text-primary leading-none">Gorakshaknath</span>
                        <span className="text-[10px] text-on-surface-variant">Merchant / Store Owner</span>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant text-sm">expand_more</span>
                </div>
            </div>
        </header>
    );
};

const MainWrapper = ({ children, activePage, setActivePage }) => (
    <div className="min-h-screen bg-surface">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <main className="ml-64">
            <Header />
            <div className="pt-20 p-xl max-w-[1440px] mx-auto animate-fade-in-up">
                {children}
            </div>
        </main>
    </div>
);

// --- Login Page ---
const Login = ({ onLogin }) => {
    return (
        <div className="bg-background font-body-md text-on-background min-h-screen flex items-center justify-center p-md animate-fade-in" style={{
            backgroundImage: "linear-gradient(rgba(237, 244, 255, 0.8), rgba(237, 244, 255, 0.8)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuA87l-oOPAa0sK8wCbJ4tJtzsz_7ZoIi27mO3jU2B8_TtWwwbohmOt3_OxV8GqVWHH0qGuPaGMgoXPWWUX3mMLBGIkyuNP9-gMAmOt0aTHLCkeb72hihULhQQowWj5k6WGVqYD438nQfavoQk1PbnIW4DzqiukETKy_kr3shTciNStwtn-q4T8wKhyqFaXesoBNl-GxfGdApRWaO8PxlWzIwQaMUOMs5VM_DPmOcHbFGxscxptBBAZi5mojNg6QMPTasqcyfyEqYsmb')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <main className="w-full max-w-[440px] z-10 animate-fade-in-up">
                <div className="flex flex-col items-center mb-xl">
                    <div className="bg-primary-container p-sm rounded-xl mb-md shadow-sm transition-transform duration-300 hover:scale-[1.05]">
                        <span className="material-symbols-outlined text-on-primary-container text-[32px]">inventory_2</span>
                    </div>
                    <h1 className="font-headline-md text-headline-md text-primary tracking-tight">MerchantIQ</h1>
                    <p className="font-body-md text-on-surface-variant mt-xs">Precision Analytics for Growth</p>
                </div>

                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-[0_20px_40px_-15px_rgba(4,31,118,0.08)] p-xl transition-all duration-300 hover:shadow-[0_25px_50px_-12px_rgba(4,31,118,0.12)]">
                    <div className="mb-lg">
                        <h2 className="font-headline-sm text-headline-sm text-on-surface">Welcome back</h2>
                        <p className="font-body-sm text-on-surface-variant">Please enter your details to sign in</p>
                    </div>

                    <form className="space-y-lg" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
                        <div className="space-y-sm">
                            <label className="block font-body-sm font-bold text-on-surface" htmlFor="username">Username, Email or Phone</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">mail</span>
                                <input className="w-full pl-[48px] pr-md py-md bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all placeholder:text-outline" id="username" placeholder="name@company.com or +91..." type="text" required />
                            </div>
                        </div>

                        <div className="space-y-sm">
                            <div className="flex justify-between items-center">
                                <label className="block font-body-sm font-bold text-on-surface" htmlFor="password">Password</label>
                                <a className="text-primary font-label-md text-label-md hover:underline transition-all" href="#">Forgot Password?</a>
                            </div>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">lock</span>
                                <input className="w-full pl-[48px] pr-md py-md bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all placeholder:text-outline" id="password" placeholder="••••••••" type="password" required />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input id="remember-me" type="checkbox" className="w-4 h-4 text-primary bg-surface-container-low border-outline-variant rounded focus:ring-primary-container focus:ring-2 transition-all cursor-pointer" />
                            <label htmlFor="remember-me" className="ml-2 font-body-sm text-on-surface-variant cursor-pointer select-none">Remember me</label>
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

const Dashboard = ({ customers, transactions, getCustomerMetrics }) => {
    
    // Dynamic Calculations
    const todayStr = new Date().toDateString();
    const todaysTransactions = transactions.filter(t => new Date(t.date).toDateString() === todayStr);
    const dailyPayments = todaysTransactions.filter(t => t.type === 'Payment').reduce((sum, t) => sum + Number(t.amount), 0);
    const todaysOrdersCount = todaysTransactions.length;

    let totalPendingCredits = 0;
    customers.forEach(c => {
        const metrics = getCustomerMetrics(c.id);
        if (metrics.runningBalance > 0) {
            totalPendingCredits += metrics.runningBalance;
        }
    });

    return (
        <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-lg">
                <div>
                    <h2 className="font-headline-lg text-headline-lg text-primary">Overview</h2>
                    <p className="text-on-surface-variant font-body-md">Welcome back, Gorakshaknath. Here's what's happening today.</p>
                </div>
                <div className="flex gap-sm">
                    <button className="px-md py-sm bg-white border border-outline-variant rounded-xl font-label-md text-label-md text-on-surface hover:bg-surface-container hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center gap-sm">
                        <span className="material-symbols-outlined text-[18px]">calendar_today</span> Last 7 Days
                    </button>
                    <button className="px-md py-sm bg-primary text-on-primary rounded-xl font-label-md text-label-md hover:opacity-90 hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center gap-sm">
                        <span className="material-symbols-outlined text-[18px]">download</span> Export Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg mb-xl">
                <div className="bg-white p-lg rounded-2xl card-shadow border border-outline-variant/30 flex flex-col justify-between min-h-[140px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="flex justify-between items-start">
                        <div className="w-10 h-10 bg-primary-container/10 rounded-lg flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined fill-1">payments</span>
                        </div>
                        <span className="bg-green-100 text-green-700 px-sm py-xs rounded-full text-[10px] font-bold">Dynamic ↑</span>
                    </div>
                    <div className="mt-md">
                        <p className="text-on-surface-variant font-label-md">Payments Collected Today</p>
                        <h3 className="font-display-lg text-headline-lg text-on-surface">{formatInr(dailyPayments)}</h3>
                    </div>
                </div>
                <div className="bg-white p-lg rounded-2xl card-shadow border border-outline-variant/30 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="flex justify-between items-start">
                        <div className="w-10 h-10 bg-secondary-fixed/30 rounded-lg flex items-center justify-center text-secondary">
                            <span className="material-symbols-outlined fill-1">shopping_cart</span>
                        </div>
                        <span className="bg-green-100 text-green-700 px-sm py-xs rounded-full text-[10px] font-bold">Live ↑</span>
                    </div>
                    <div className="mt-md">
                        <p className="text-on-surface-variant font-label-md">Transactions Today</p>
                        <h3 className="font-display-lg text-headline-lg text-on-surface">{todaysOrdersCount}</h3>
                    </div>
                </div>
                <div className="bg-white p-lg rounded-2xl card-shadow border border-outline-variant/30 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="flex justify-between items-start">
                        <div className="w-10 h-10 bg-tertiary-container/10 rounded-lg flex items-center justify-center text-tertiary">
                            <span className="material-symbols-outlined fill-1">account_balance_wallet</span>
                        </div>
                        <span className="bg-yellow-100 text-yellow-700 px-sm py-xs rounded-full text-[10px] font-bold">Pending</span>
                    </div>
                    <div className="mt-md">
                        <p className="text-on-surface-variant font-label-md">Total Pending Credits</p>
                        <h3 className="font-display-lg text-headline-lg text-error">{formatInr(totalPendingCredits)}</h3>
                    </div>
                </div>
                <div className="bg-primary p-lg rounded-2xl card-shadow border-none flex flex-col justify-between text-on-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="flex justify-between items-start">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white">
                            <span className="material-symbols-outlined fill-1">star</span>
                        </div>
                    </div>
                    <div className="mt-md">
                        <p className="text-white/70 font-label-md">Total Customers</p>
                        <h3 className="font-headline-md text-headline-md leading-tight">{customers.length} Accounts</h3>
                        <p className="text-white/50 text-[11px] mt-xs">Registered in system</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-xl rounded-2xl card-shadow border border-outline-variant/30 mb-xl transition-all duration-300 hover:shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md mb-xl">
                    <div>
                        <h3 className="font-headline-md text-headline-md text-on-surface">Sales Analytics</h3>
                        <p className="text-on-surface-variant font-body-md">Performance track over the last 7 days</p>
                    </div>
                    <div className="flex items-center gap-lg">
                        <div className="flex items-center gap-xs">
                            <span className="w-3 h-3 rounded-full bg-primary-container"></span>
                            <span className="text-body-sm font-label-md">Revenue</span>
                        </div>
                        <div className="flex items-center gap-xs">
                            <span className="w-3 h-3 rounded-full bg-secondary-fixed-dim"></span>
                            <span className="text-body-sm font-label-md">Target</span>
                        </div>
                    </div>
                </div>
                <div className="relative h-[300px] w-full">
                    <svg className="w-full h-full" viewBox="0 0 1000 300">
                        <path d="M0,250 Q150,180 300,220 T600,100 T1000,120 L1000,300 L0,300 Z" fill="rgba(36, 56, 140, 0.05)"></path>
                        <path d="M0,250 Q150,180 300,220 T600,100 T1000,120" fill="none" stroke="#24388C" strokeWidth="4"></path>
                        <path d="M0,200 L1000,100" fill="none" stroke="#58D5F7" strokeDasharray="8,8" strokeWidth="2"></path>
                        <circle cx="300" cy="220" fill="#24388C" r="6" stroke="white" strokeWidth="2"></circle>
                        <circle cx="600" cy="100" fill="#24388C" r="6" stroke="white" strokeWidth="2"></circle>
                    </svg>
                    <div className="flex justify-between mt-md px-xs text-on-surface-variant font-label-md text-[11px]">
                        <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Products = () => (
    <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-lg mb-xl">
            <div>
                <h2 className="font-headline-lg text-headline-lg text-primary mb-xs">Products</h2>
                <p className="text-body-md text-on-surface-variant">Manage your inventory, stock levels, and product performance.</p>
            </div>
            <button className="flex items-center gap-sm px-lg py-md bg-primary text-white rounded-xl font-bold custom-shadow hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-300">
                <span className="material-symbols-outlined">add</span>
                Add Product
            </button>
        </div>
        <div className="grid grid-cols-12 gap-lg">
            <div className="col-span-12 lg:col-span-9 space-y-lg">
                <div className="bg-white rounded-xl border border-outline-variant custom-shadow overflow-x-auto transition-all duration-300 hover:shadow-lg">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead className="bg-surface-container-low border-b border-outline-variant">
                            <tr>
                                <th className="px-lg py-md text-label-md text-on-surface-variant uppercase tracking-widest">Product</th>
                                <th className="px-lg py-md text-label-md text-on-surface-variant uppercase tracking-widest text-center">Category</th>
                                <th className="px-lg py-md text-label-md text-on-surface-variant uppercase tracking-widest text-center">Stock</th>
                                <th className="px-lg py-md text-label-md text-on-surface-variant uppercase tracking-widest text-right">Price</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant">
                            {[
                                { name: 'Premium Assam Tea', sku: 'AS-2024-RED', cat: 'Beverages', stock: 'Low Stock (4)', price: '₹1,290.00', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnlLhOlIAp3-TK5BfNyeSsyByctYI05zGYyWeC-SfR31cSRJ8S-ITDoVB-kL4EVHHzOxlTYdoF8aS9fhh94KptKs9Voax5dPAGPscOxnuXH4n2bJwCwxHhu1u9OUKfQnttF_DIP-_24ABlhh9ylsu88wShfVYd1zZXXlAY0IKxzCTjzazi7reHljvk8ZGmB11H4mW73LGHDTDVIvOq8gQF9eegfzIxv8dXRzV9ZKbrSjZGrOjpudELJgkiHN8UzdgarbsT_FtLuboB', stockStyle: 'bg-error text-white' },
                                { name: 'Handcrafted Copper Mug', sku: 'CM-W-882', cat: 'Kitchenware', stock: 'In Stock (142)', price: '₹2,495.50', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlDhxT4CFUdUWDWzJX3sgQBvjqTGV6yNbelhFnCC-57WOtF_BzdyOokLVJCfMO9pS7yXHoqrj5_qtbyiy-1d9yb6BMIBkl3zhwS957gVX0A29dyAr79qtLZBXVD1jUpNtZmyFh7zn-abSmbdw2oQebTmttVs8d5WKcV2XTsiosnpDNOpLjMB9BcE7hKuN6oFdx5xu9YF_djT1JoKdjazjptULXsXcmCKSMPpiTA0gNdcpUr52_zKsvEKUJhazswSKgantbp3gBhGnJ', stockStyle: 'bg-secondary-container text-on-secondary-container' }
                            ].map((item) => (
                                <tr key={item.sku} className="hover:bg-surface-container-low transition-colors duration-300 group">
                                    <td className="px-lg py-md">
                                        <div className="flex items-center gap-md">
                                            <img className="w-12 h-12 rounded-lg object-cover transition-transform duration-300 group-hover:scale-105" src={item.img} alt={item.name} />
                                            <div>
                                                <p className="font-bold group-hover:text-primary transition-colors duration-300">{item.name}</p>
                                                <p className="text-body-sm text-outline">{item.sku}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-lg py-md text-center">
                                        <span className="px-sm py-xs bg-surface-container-highest text-primary font-bold text-label-sm rounded-lg">{item.cat}</span>
                                    </td>
                                    <td className="px-lg py-md text-center">
                                        <span className={`px-sm py-xs font-bold text-label-sm rounded-full ${item.stockStyle}`}>{item.stock}</span>
                                    </td>
                                    <td className="px-lg py-md text-right font-bold">{item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <aside className="col-span-12 lg:col-span-3 space-y-lg">
                <div className="bg-primary-container text-on-primary-container p-lg rounded-2xl custom-shadow relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <p className="text-label-md uppercase tracking-wider opacity-80 mb-sm">Inventory Value</p>
                    <h3 className="font-headline-lg text-headline-lg mb-md">₹24,85,900</h3>
                </div>
            </aside>
        </div>
    </div>
);

const Customers = ({ customers, setCustomers, transactions, setTransactions, getCustomerMetrics }) => {
    const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
    const [isLogTransactionOpen, setIsLogTransactionOpen] = useState(false);
    const [historyModalCustomerId, setHistoryModalCustomerId] = useState(null);

    // Dynamic Top Metrics
    let globalActiveCreditUsers = 0;
    let globalOutstandingCredit = 0;
    customers.forEach(c => {
        const metrics = getCustomerMetrics(c.id);
        if (metrics.runningBalance > 0) {
            globalActiveCreditUsers++;
            globalOutstandingCredit += metrics.runningBalance;
        }
    });

    const handleAddCustomer = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newCustomer = {
            id: Date.now().toString(),
            name: formData.get('name'),
            phone: formData.get('phone'),
            openingBalance: Number(formData.get('openingBalance')) || 0,
            createdAt: new Date().toISOString()
        };
        setCustomers([newCustomer, ...customers]);
        setIsAddCustomerOpen(false);
    };

    const handleLogTransaction = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newTx = {
            id: Date.now().toString(),
            customerId: formData.get('customerId'),
            type: formData.get('type'),
            amount: Number(formData.get('amount')) || 0,
            notes: formData.get('notes'),
            date: formData.get('date') || new Date().toISOString()
        };
        setTransactions([newTx, ...transactions]);
        setIsLogTransactionOpen(false);
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
                            const metrics = getCustomerMetrics(c.id);
                            const hasPending = metrics.runningBalance > 0;

                            return (
                                <tr key={c.id} className="group hover:bg-surface-container-lowest transition-colors duration-300">
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
                                        <button onClick={() => setHistoryModalCustomerId(c.id)} className="px-md py-sm bg-surface-container-low border border-outline-variant text-primary rounded-lg text-body-sm font-bold hover:bg-primary hover:text-white active:scale-95 transition-all duration-300 shadow-sm">
                                            View History
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        {customers.length === 0 && (
                            <tr><td colSpan="6" className="text-center py-xl text-on-surface-variant">No customers found. Add a customer to get started.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Customer Modal */}
            {isAddCustomerOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in p-4 overflow-y-auto">
                    <div className="bg-surface-container-lowest rounded-2xl p-xl w-full max-w-[450px] min-w-[320px] shrink-0 shadow-2xl animate-fade-in-up border border-outline-variant m-auto">
                        <h3 className="font-headline-md text-headline-md text-primary mb-md">Add New Customer</h3>
                        <form onSubmit={handleAddCustomer} className="space-y-md">
                            <div>
                                <label className="block font-body-sm font-bold text-on-surface mb-xs">Customer Name</label>
                                <input required name="name" type="text" className="w-full p-sm bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="e.g. Sneha Verma" />
                            </div>
                            <div>
                                <label className="block font-body-sm font-bold text-on-surface mb-xs">Phone Number</label>
                                <input required name="phone" type="tel" className="w-full p-sm bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="+91 98765 43210" />
                            </div>
                            <div>
                                <label className="block font-body-sm font-bold text-on-surface mb-xs">Opening Balance (Optional)</label>
                                <input name="openingBalance" type="number" defaultValue="0" className="w-full p-sm bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                                <p className="text-[10px] text-outline mt-1">Starting pending dues if any.</p>
                            </div>
                            <div className="flex gap-sm mt-lg pt-md border-t border-outline-variant">
                                <button type="button" onClick={() => setIsAddCustomerOpen(false)} className="flex-1 py-sm bg-surface-container-highest text-on-surface font-bold rounded-lg hover:bg-outline-variant transition-colors active:scale-95">Cancel</button>
                                <button type="submit" className="flex-1 py-sm bg-primary text-on-primary font-bold rounded-lg hover:opacity-90 transition-all active:scale-95 shadow-sm shadow-primary/20">Save Customer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Log Transaction Modal */}
            {isLogTransactionOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in p-4 overflow-y-auto">
                    <div className="bg-surface-container-lowest rounded-2xl p-xl w-full max-w-[450px] min-w-[320px] shrink-0 shadow-2xl animate-fade-in-up border border-outline-variant m-auto">
                        <h3 className="font-headline-md text-headline-md text-primary mb-md">Log Transaction</h3>
                        <form onSubmit={handleLogTransaction} className="space-y-md">
                            <div>
                                <label className="block font-body-sm font-bold text-on-surface mb-xs">Select Customer</label>
                                <select required name="customerId" className="w-full p-sm bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all cursor-pointer">
                                    <option value="">-- Choose Customer --</option>
                                    {customers.map(c => <option key={c.id} value={c.id}>{c.name} ({c.phone})</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block font-body-sm font-bold text-on-surface mb-xs">Transaction Type</label>
                                <div className="flex gap-sm">
                                    <label className="flex-1 flex items-center gap-2 p-sm border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors">
                                        <input type="radio" name="type" value="Credit" required className="text-primary focus:ring-primary" />
                                        <span className="font-bold text-error">Give Credit (Dues)</span>
                                    </label>
                                    <label className="flex-1 flex items-center gap-2 p-sm border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors">
                                        <input type="radio" name="type" value="Payment" className="text-primary focus:ring-primary" />
                                        <span className="font-bold text-green-700">Receive Payment</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block font-body-sm font-bold text-on-surface mb-xs">Amount (₹)</label>
                                <input required name="amount" type="number" min="1" className="w-full p-sm bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="0" />
                            </div>
                            <div>
                                <label className="block font-body-sm font-bold text-on-surface mb-xs">Notes / Details</label>
                                <input name="notes" type="text" className="w-full p-sm bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="e.g. 5x Sugar Sacks" />
                            </div>
                            <div>
                                <label className="block font-body-sm font-bold text-on-surface mb-xs">Date</label>
                                <input required name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full p-sm bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                            </div>
                            <div className="flex gap-sm mt-lg pt-md border-t border-outline-variant">
                                <button type="button" onClick={() => setIsLogTransactionOpen(false)} className="flex-1 py-sm bg-surface-container-highest text-on-surface font-bold rounded-lg hover:bg-outline-variant transition-colors active:scale-95">Cancel</button>
                                <button type="submit" className="flex-1 py-sm bg-primary text-on-primary font-bold rounded-lg hover:opacity-90 transition-all active:scale-95 shadow-sm shadow-primary/20">Save Transaction</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View History Section (Down Section) */}
            {historyModalCustomerId && (() => {
                const c = customers.find(x => x.id === historyModalCustomerId);
                const tList = transactions.filter(t => t.customerId === historyModalCustomerId).sort((a,b) => new Date(b.date) - new Date(a.date));
                const metrics = getCustomerMetrics(historyModalCustomerId);

                return (
                    <div className="mt-xl bg-white border border-outline-variant rounded-xl card-shadow flex flex-col animate-fade-in-up">
                        <div className="p-lg border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest rounded-t-xl">
                            <div>
                                <h3 className="font-headline-md text-headline-md text-primary">{c.name}'s Ledger</h3>
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
                                        <th className="px-lg py-sm text-outline font-label-md uppercase">Notes</th>
                                        <th className="px-lg py-sm text-right text-outline font-label-md uppercase">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant bg-white">
                                    {tList.map((t) => (
                                        <tr key={t.id} className="hover:bg-surface-container-lowest transition-colors">
                                            <td className="px-lg py-md text-on-surface-variant font-body-sm">{formatDate(t.date)}</td>
                                            <td className="px-lg py-md">
                                                <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${t.type === 'Credit' ? 'bg-error-container text-on-error-container' : 'bg-green-100 text-green-800'}`}>
                                                    {t.type}
                                                </span>
                                            </td>
                                            <td className="px-lg py-md text-on-surface font-body-sm">{t.notes || '-'}</td>
                                            <td className={`px-lg py-md text-right font-bold ${t.type === 'Credit' ? 'text-error' : 'text-green-700'}`}>
                                                {t.type === 'Credit' ? '+' : '-'}{formatInr(t.amount)}
                                            </td>
                                        </tr>
                                    ))}
                                    {tList.length === 0 && (
                                        <tr><td colSpan="4" className="text-center py-xl text-on-surface-variant">No transactions found for this customer.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            })()}

        </div>
    );
};

const Reports = () => (
    <div className="animate-fade-in">
        <div className="flex justify-between items-end mb-xl">
            <div>
                <h2 className="font-headline-lg text-headline-lg text-primary mb-xs">Business Reports</h2>
                <p className="text-body-lg text-on-surface-variant">Deep dive into store performance and financial health.</p>
            </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-lg mb-xl">
            {['Sales', 'Inventory', 'Customers', 'Financials'].map((cat, i) => (
                <div key={cat} className="bg-surface-container-low p-md rounded-xl border border-outline-variant hover:border-primary transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer group">
                    <div className="w-10 h-10 bg-surface text-primary rounded-lg flex items-center justify-center mb-md group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300 shadow-sm">
                        <span className="material-symbols-outlined">{['payments', 'inventory', 'person_add', 'account_balance'][i]}</span>
                    </div>
                    <h3 className="font-headline-sm text-on-surface mb-xs group-hover:text-primary transition-colors duration-300">{cat}</h3>
                    <p className="text-body-sm text-on-surface-variant">Detailed metrics and history.</p>
                </div>
            ))}
        </div>
    </div>
);

const Settings = () => (
    <div className="animate-fade-in pb-20">
        <div className="flex flex-col gap-xs mb-xl">
            <h1 className="font-headline-lg text-headline-lg text-on-surface">Settings</h1>
            <p className="text-on-surface-variant font-body-md">Manage your MerchantIQ store preferences and account security.</p>
        </div>
        <div className="grid grid-cols-12 gap-lg">
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-lg">
                <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center gap-md mb-xl">
                        <span className="material-symbols-outlined text-primary bg-primary-fixed p-sm rounded-lg shadow-sm">store</span>
                        <h2 className="font-headline-sm">Business Profile</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
                        <div className="flex flex-col gap-xs">
                            <label className="font-body-sm font-bold text-on-surface-variant">Store Name</label>
                            <input className="bg-surface-container-low border-outline-variant rounded-lg p-sm focus:ring-2 focus:ring-primary focus:bg-white focus:outline-none transition-all duration-300" type="text" defaultValue="Gorakshaknath Merchants Ltd."/>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
);

// --- App Component ---

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activePage, setActivePage] = useState('dashboard');

    // Data State initialized from localStorage
    const [customers, setCustomers] = useState(() => {
        const saved = localStorage.getItem('merchantiq_customers');
        if (saved) return JSON.parse(saved);
        return [
            { id: 'c1', name: 'Anita Sharma', phone: '+91 98765 43210', openingBalance: 0, createdAt: new Date().toISOString() },
            { id: 'c2', name: 'Arjun Reddy', phone: '+91 91234 56789', openingBalance: 0, createdAt: new Date().toISOString() }
        ];
    });

    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem('merchantiq_transactions');
        if (saved) return JSON.parse(saved);
        const todayStr = new Date().toISOString();
        return [
            { id: 't1', customerId: 'c1', type: 'Credit', amount: 42500, notes: 'Bulk pulses order', date: todayStr },
            { id: 't2', customerId: 'c1', type: 'Payment', amount: 24000, notes: 'Part payment cash', date: todayStr },
            { id: 't3', customerId: 'c2', type: 'Credit', amount: 124000, notes: 'Wholesale supplies', date: todayStr },
            { id: 't4', customerId: 'c2', type: 'Payment', amount: 122800, notes: 'Cleared invoice via UPI', date: todayStr }
        ];
    });

    // Save to localStorage on change
    useEffect(() => {
        localStorage.setItem('merchantiq_customers', JSON.stringify(customers));
    }, [customers]);

    useEffect(() => {
        localStorage.setItem('merchantiq_transactions', JSON.stringify(transactions));
    }, [transactions]);

    const getCustomerMetrics = (customerId) => {
        const customer = customers.find(c => c.id === customerId);
        const custTransactions = transactions.filter(t => t.customerId === customerId);
        
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

    if (!isAuthenticated) {
        return <Login onLogin={() => setIsAuthenticated(true)} />;
    }

    const renderPage = () => {
        switch(activePage) {
            case 'dashboard': 
                return <Dashboard customers={customers} transactions={transactions} getCustomerMetrics={getCustomerMetrics} />;
            case 'products': 
                return <Products />;
            case 'customers': 
                return <Customers customers={customers} setCustomers={setCustomers} transactions={transactions} setTransactions={setTransactions} getCustomerMetrics={getCustomerMetrics} />;
            case 'reports': 
                return <Reports />;
            case 'settings': 
                return <Settings />;
            default: 
                return <Dashboard customers={customers} transactions={transactions} getCustomerMetrics={getCustomerMetrics} />;
        }
    };

    return (
        <MainWrapper activePage={activePage} setActivePage={setActivePage}>
            {renderPage()}
        </MainWrapper>
    );
};

export default App;
