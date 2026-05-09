import React, { useState } from 'react';

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

const Header = ({ title = "MerchantIQ" }) => {
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

                    <div className="relative my-xl">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-outline-variant"></div>
                        </div>
                        <div className="relative flex justify-center text-label-md">
                            <span className="px-md bg-surface-container-lowest text-on-surface-variant font-label-md">OR</span>
                        </div>
                    </div>

                    <button className="w-full flex items-center justify-center gap-md bg-surface-container-lowest border border-outline-variant text-on-surface-variant font-body-md py-md rounded-lg hover:bg-surface-container transition-colors active:scale-[0.98] duration-300">
                        <img alt="Google Logo" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbnmRFKT_7iwg6yzbWugEER7eXzGJ0G2tWCR2netYiBE8EF-cTHmiHETYY2Rvocj8TqwRY6W5UcQy1jv0jg0WtU8MRjbbEf8oFl0KtKxkG9Hs2zEDHfVNTzn4Ts8DDtIex14lULXzl37LoxgLbLoFxfI0z3UvyiSHmt1EqtodNhaAIzRMDAY6LcWD6J9jedJWIeSl_DWmRXO93E0lLQ24FtZnvFGiKSPqSUc-oVrKwQF08kpg6v6bh-aRJTOoY-8EM1kdufo1MvbWQ" />
                        <span>Continue with Google</span>
                    </button>
                </div>

                <footer className="mt-xl flex justify-center gap-lg">
                    <a className="text-on-surface-variant font-body-sm hover:text-primary transition-colors" href="#">Privacy Policy</a>
                    <a className="text-on-surface-variant font-body-sm hover:text-primary transition-colors" href="#">Terms of Service</a>
                    <a className="text-on-surface-variant font-body-sm hover:text-primary transition-colors" href="#">Help Center</a>
                </footer>
            </main>

            <div className="fixed bottom-lg right-lg">
                <button className="bg-primary text-on-primary w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300">
                    <span className="material-symbols-outlined">chat</span>
                </button>
            </div>
        </div>
    );
};

// --- Pages ---

const Dashboard = () => (
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
                    <span className="bg-green-100 text-green-700 px-sm py-xs rounded-full text-[10px] font-bold">+12% ↑</span>
                </div>
                <div className="mt-md">
                    <p className="text-on-surface-variant font-label-md">Daily Revenue</p>
                    <h3 className="font-display-lg text-headline-lg text-on-surface">₹45,250</h3>
                </div>
            </div>
            <div className="bg-white p-lg rounded-2xl card-shadow border border-outline-variant/30 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="flex justify-between items-start">
                    <div className="w-10 h-10 bg-secondary-fixed/30 rounded-lg flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined fill-1">shopping_cart</span>
                    </div>
                    <span className="bg-green-100 text-green-700 px-sm py-xs rounded-full text-[10px] font-bold">+5% ↑</span>
                </div>
                <div className="mt-md">
                    <p className="text-on-surface-variant font-label-md">Orders Today</p>
                    <h3 className="font-display-lg text-headline-lg text-on-surface">84</h3>
                </div>
            </div>
            <div className="bg-white p-lg rounded-2xl card-shadow border border-outline-variant/30 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="flex justify-between items-start">
                    <div className="w-10 h-10 bg-tertiary-container/10 rounded-lg flex items-center justify-center text-tertiary">
                        <span className="material-symbols-outlined fill-1">account_balance_wallet</span>
                    </div>
                    <span className="bg-yellow-100 text-yellow-700 px-sm py-xs rounded-full text-[10px] font-bold">Stable</span>
                </div>
                <div className="mt-md">
                    <p className="text-on-surface-variant font-label-md">Pending Credits</p>
                    <h3 className="font-display-lg text-headline-lg text-on-surface">₹12,200</h3>
                </div>
            </div>
            <div className="bg-primary p-lg rounded-2xl card-shadow border-none flex flex-col justify-between text-on-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="flex justify-between items-start">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white">
                        <span className="material-symbols-outlined fill-1">star</span>
                    </div>
                </div>
                <div className="mt-md">
                    <p className="text-white/70 font-label-md">Best Selling Product</p>
                    <h3 className="font-headline-md text-headline-md leading-tight">Organic Tea Bags</h3>
                    <p className="text-white/50 text-[11px] mt-xs">24% of total volume</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
            <div className="bg-white p-lg rounded-2xl card-shadow border border-outline-variant/30 transition-all duration-300 hover:shadow-lg">
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-lg">Top Products</h3>
                <div className="space-y-md">
                    {['Organic Tea Bags', 'Premium Coffee', 'Spices Box', 'Gift Sets'].map((p, i) => (
                        <div key={p} className="space-y-xs group">
                            <div className="flex justify-between items-end">
                                <span className="font-body-md text-on-surface font-semibold group-hover:text-primary transition-colors duration-300">{p}</span>
                                <span className="text-body-sm text-on-surface-variant">{[42, 28, 18, 12][i]}%</span>
                            </div>
                            <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                                <div className="h-full bg-primary-container" style={{ width: `${[42, 28, 18, 12][i]}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white p-lg rounded-2xl card-shadow border border-outline-variant/30 overflow-hidden transition-all duration-300 hover:shadow-lg">
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-lg">Recent Orders</h3>
                <table className="w-full text-left">
                    <tbody className="text-body-sm divide-y divide-surface-container">
                        {[
                            { name: 'Priya Patel', time: '2 mins ago', amount: '₹1,245', status: 'PAID', style: 'bg-green-100 text-green-700' },
                            { name: 'Vikram Singh', time: '14 mins ago', amount: '₹890', status: 'PENDING', style: 'bg-yellow-100 text-yellow-700' },
                            { name: 'Rajesh Kumar', time: '1 hour ago', amount: '₹2,100', status: 'PAID', style: 'bg-green-100 text-green-700' }
                        ].map((order) => (
                            <tr key={order.name} className="group hover:bg-surface-container-low transition-colors duration-300">
                                <td className="py-md pl-xs">
                                    <p className="font-bold group-hover:text-primary transition-colors duration-300">{order.name}</p>
                                    <p className="text-[10px] text-on-surface-variant">{order.time}</p>
                                </td>
                                <td className="py-md font-semibold">{order.amount}</td>
                                <td className="py-md text-right pr-xs">
                                    <span className={`px-sm py-unit rounded-lg text-[10px] font-bold ${order.style}`}>{order.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="bg-primary-container p-lg rounded-2xl text-on-primary-container border-none relative overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative z-10">
                    <div className="flex items-center gap-sm mb-md">
                        <span className="material-symbols-outlined text-secondary-fixed-dim fill-1">auto_awesome</span>
                        <h3 className="font-label-md uppercase tracking-widest text-primary-fixed">Smart Insights</h3>
                    </div>
                    <p className="text-body-md font-medium text-white leading-relaxed">
                        Sales increased by <span className="text-secondary-fixed-dim font-bold">18%</span> this week. <span className="opacity-80">Friday had the highest volume, driven by the 'Diwali Rush' promo.</span>
                    </p>
                </div>
                <button className="text-secondary-fixed-dim text-label-md font-bold hover:underline flex items-center gap-xs z-10 mt-4 lg:mt-0 group transition-all duration-300 hover:scale-[1.02]">
                    Analyze Trends <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
            </div>
        </div>
    </div>
);

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
                <div className="flex items-center gap-sm overflow-x-auto pb-xs">
                    <button className="px-md py-sm bg-primary text-white rounded-full text-label-md font-bold whitespace-nowrap transition-all duration-300 active:scale-95">All Products</button>
                    <button className="px-md py-sm bg-white border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-all duration-300 rounded-full text-label-md font-bold whitespace-nowrap active:scale-95 hover:shadow-sm">Low Stock</button>
                    <button className="px-md py-sm bg-white border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-all duration-300 rounded-full text-label-md font-bold whitespace-nowrap active:scale-95 hover:shadow-sm">Top Selling</button>
                    <div className="ml-auto flex items-center gap-xs">
                        <span className="text-label-sm text-outline uppercase tracking-wider">Sort:</span>
                        <select className="bg-transparent border-none text-label-md font-bold text-primary focus:ring-0 cursor-pointer focus:outline-none transition-all duration-300 hover:opacity-80"><option>Newest First</option></select>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-outline-variant custom-shadow overflow-x-auto transition-all duration-300 hover:shadow-lg">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead className="bg-surface-container-low border-b border-outline-variant">
                            <tr>
                                <th className="px-lg py-md text-label-md text-on-surface-variant uppercase tracking-widest">Product</th>
                                <th className="px-lg py-md text-label-md text-on-surface-variant uppercase tracking-widest text-center">Category</th>
                                <th className="px-lg py-md text-label-md text-on-surface-variant uppercase tracking-widest text-center">Stock</th>
                                <th className="px-lg py-md text-label-md text-on-surface-variant uppercase tracking-widest text-right">Price</th>
                                <th className="px-lg py-md"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant">
                            {[
                                { name: 'Premium Assam Tea', sku: 'AS-2024-RED', cat: 'Beverages', stock: 'Low Stock (4)', price: '₹1,290.00', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnlLhOlIAp3-TK5BfNyeSsyByctYI05zGYyWeC-SfR31cSRJ8S-ITDoVB-kL4EVHHzOxlTYdoF8aS9fhh94KptKs9Voax5dPAGPscOxnuXH4n2bJwCwxHhu1u9OUKfQnttF_DIP-_24ABlhh9ylsu88wShfVYd1zZXXlAY0IKxzCTjzazi7reHljvk8ZGmB11H4mW73LGHDTDVIvOq8gQF9eegfzIxv8dXRzV9ZKbrSjZGrOjpudELJgkiHN8UzdgarbsT_FtLuboB', stockStyle: 'bg-error text-white' },
                                { name: 'Handcrafted Copper Mug', sku: 'CM-W-882', cat: 'Kitchenware', stock: 'In Stock (142)', price: '₹2,495.50', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlDhxT4CFUdUWDWzJX3sgQBvjqTGV6yNbelhFnCC-57WOtF_BzdyOokLVJCfMO9pS7yXHoqrj5_qtbyiy-1d9yb6BMIBkl3zhwS957gVX0A29dyAr79qtLZBXVD1jUpNtZmyFh7zn-abSmbdw2oQebTmttVs8d5WKcV2XTsiosnpDNOpLjMB9BcE7hKuN6oFdx5xu9YF_djT1JoKdjazjptULXsXcmCKSMPpiTA0gNdcpUr52_zKsvEKUJhazswSKgantbp3gBhGnJ', stockStyle: 'bg-secondary-container text-on-secondary-container' },
                                { name: 'Organic Turmeric Pack', sku: 'OT-H-102', cat: 'Spices', stock: 'In Stock (48)', price: '₹189.00', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEpDkkH0WerSKQMkYPVDyegx6un7iaa8KjqaResSrBzJbukGXCy5uellQf22RNOS98N8pfHjfU0MmghZH5UdpETqHL5UCyRNmmfDs-RHUopjR8B7tiHVxkSMdH3nXkmyuN9b9phY-pVP7K8e5eEXMLGnPMQhgkVMxczFz9ZIRr3zeD0aFt1rLmXi2iciTTNCsBbwqjmd4u-t5pdqF9cWeNnr-iXxM0oceNhgSqrdx6bsfgYL5ObtpSbJntiOoLtaOOPiniQPeIE8n2', stockStyle: 'bg-secondary-container text-on-secondary-container' }
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
                                    <td className="px-lg py-md text-right">
                                        <button className="p-sm text-outline hover:text-primary transition-colors duration-300 cursor-pointer rounded-full hover:bg-surface-container-high"><span className="material-symbols-outlined">more_vert</span></button>
                                    </td>
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
                    <span className="px-sm py-xs bg-white/20 rounded-full text-label-sm font-bold">+12.5%</span>
                </div>
                <div className="bg-white p-lg rounded-2xl border border-outline-variant custom-shadow transition-all duration-300 hover:shadow-lg">
                    <h4 className="font-headline-sm text-headline-sm mb-lg">Restock Queue</h4>
                    <div className="p-md bg-error-container/20 border border-error/10 rounded-xl transition-all duration-300 hover:bg-error-container/30">
                        <p className="text-label-md font-bold text-error mb-xs">Critical (12 Items)</p>
                        <button className="mt-md w-full py-sm bg-error text-white font-bold rounded-lg text-label-md hover:opacity-90 active:scale-95 transition-all duration-300 shadow-sm">Generate Reorder</button>
                    </div>
                </div>
            </aside>
        </div>
    </div>
);

const Customers = () => {
    const [customers, setCustomers] = useState([
        { name: 'Anita Sharma', email: '+91 98765 43210', spent: '₹42,500', balance: '₹18,500', risk: 'High Risk', riskStyle: 'bg-error-container text-on-error-container' },
        { name: 'Arjun Reddy', email: '+91 91234 56789', spent: '₹1,24,000', balance: '₹1,200', risk: 'Healthy', riskStyle: 'bg-surface-container-highest text-outline' }
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddCustomer = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newCustomer = {
            name: formData.get('name'),
            email: formData.get('phone'),
            spent: '₹0',
            balance: formData.get('balance'),
            risk: 'Pending',
            riskStyle: 'bg-surface-container-highest text-outline'
        };
        setCustomers([newCustomer, ...customers]);
        setIsModalOpen(false);
    };

    return (
        <div className="animate-fade-in relative">
            <div className="flex justify-between items-end mb-xl">
                <div>
                    <h2 className="font-headline-lg text-headline-lg text-primary">Customers</h2>
                    <p className="text-on-surface-variant mt-xs">Monitor client relationships and manage credit risk exposure.</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-sm bg-primary text-white px-lg py-sm rounded-lg font-bold hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-300">
                    <span className="material-symbols-outlined">person_add</span> Add New Customer
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-xl">
                <div className="bg-white p-lg border border-outline-variant rounded-xl flex flex-col justify-between h-40 card-shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <span className="font-label-md text-outline uppercase tracking-wider">Total Customers</span>
                    <h3 className="font-display-lg text-4xl font-bold text-primary">12,842</h3>
                </div>
                <div className="bg-white p-lg border border-outline-variant rounded-xl flex flex-col justify-between h-40 card-shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <span className="font-label-md text-outline uppercase tracking-wider">Active Credit Users</span>
                    <h3 className="font-display-lg text-4xl font-bold text-on-surface">1,408</h3>
                </div>
                <div className="bg-error-container/10 border border-error/20 p-lg rounded-xl flex flex-col justify-between h-40 card-shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <span className="font-label-md text-error uppercase tracking-wider">Outstanding Credit</span>
                    <h3 className="font-display-lg text-4xl font-bold text-error">₹4,82,900</h3>
                </div>
            </div>

            <div className="bg-white border border-outline-variant rounded-xl overflow-x-auto card-shadow transition-all duration-300 hover:shadow-lg">
                <div className="px-lg py-md border-b border-outline-variant bg-surface-container-low flex justify-between items-center min-w-[700px]">
                    <div className="flex gap-md">
                        <button className="font-label-md text-primary border-b-2 border-primary pb-1 transition-colors">All Customers</button>
                        <button className="font-label-md text-outline hover:text-primary transition-colors">Credit Holders</button>
                    </div>
                </div>
                <table className="w-full text-left min-w-[700px]">
                    <thead className="bg-surface-bright border-b border-outline-variant">
                        <tr>
                            <th className="px-lg py-md text-outline font-label-md uppercase">Customer</th>
                            <th className="px-lg py-md text-outline font-label-md uppercase">Total Spent</th>
                            <th className="px-lg py-md text-outline font-label-md uppercase">Balance</th>
                            <th className="px-lg py-md text-right text-outline font-label-md uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant">
                        {customers.map((c, idx) => (
                            <tr key={idx} className="group hover:bg-surface-container-lowest transition-colors duration-300">
                                <td className="px-lg py-lg">
                                    <div className="flex items-center gap-md">
                                        <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold transition-transform duration-300 group-hover:scale-110">{c.name[0]}</div>
                                        <div>
                                            <p className="font-bold group-hover:text-primary transition-colors duration-300">{c.name}</p>
                                            <p className="text-body-sm text-outline">{c.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-lg py-lg font-semibold">{c.spent}</td>
                                <td className="px-lg py-lg">
                                    <p className="font-bold">{c.balance}</p>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold ${c.riskStyle}`}>{c.risk}</span>
                                </td>
                                <td className="px-lg py-lg text-right">
                                    <button className="px-md py-sm bg-primary text-white rounded-lg text-body-sm font-bold hover:opacity-90 active:scale-95 transition-all duration-300 shadow-sm">Record Payment</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
                    <div className="bg-surface-container-lowest rounded-2xl p-xl max-w-md w-full shadow-2xl animate-fade-in-up border border-outline-variant m-4">
                        <h3 className="font-headline-md text-headline-md text-primary mb-md">Add New Customer</h3>
                        <form onSubmit={handleAddCustomer} className="space-y-md">
                            <div>
                                <label className="block font-body-sm font-bold text-on-surface mb-xs">Customer Name</label>
                                <input required name="name" type="text" className="w-full p-sm bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="e.g. Sneha Verma" />
                            </div>
                            <div>
                                <label className="block font-body-sm font-bold text-on-surface mb-xs">Phone Number</label>
                                <input required name="phone" type="tel" className="w-full p-sm bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="+91..." />
                            </div>
                            <div>
                                <label className="block font-body-sm font-bold text-on-surface mb-xs">Pending Amount</label>
                                <input required name="balance" type="text" className="w-full p-sm bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="₹0" />
                            </div>
                            <div>
                                <label className="block font-body-sm font-bold text-on-surface mb-xs">Last Transaction Date</label>
                                <input required name="date" type="date" className="w-full p-sm bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                            </div>
                            <div className="flex gap-sm mt-lg pt-md border-t border-outline-variant">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-sm bg-surface-container-highest text-on-surface font-bold rounded-lg hover:bg-outline-variant transition-colors active:scale-95">Cancel</button>
                                <button type="submit" className="flex-1 py-sm bg-primary text-on-primary font-bold rounded-lg hover:opacity-90 transition-all active:scale-95 shadow-sm shadow-primary/20">Save Customer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
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
            <div className="flex gap-md">
                <button className="flex items-center gap-sm bg-white border border-outline-variant text-primary px-lg py-sm rounded-lg font-label-md hover:bg-surface-container-low active:scale-95 hover:shadow-sm transition-all duration-300">
                    <span className="material-symbols-outlined text-md">download</span> Export All
                </button>
                <button className="flex items-center gap-sm bg-primary text-on-primary px-lg py-sm rounded-lg font-label-md hover:opacity-90 active:scale-95 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                    <span className="material-symbols-outlined text-md">add</span> Custom Report
                </button>
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
        <div className="bg-white border border-outline-variant rounded-xl custom-shadow overflow-x-auto transition-all duration-300 hover:shadow-lg">
            <div className="px-lg py-md border-b border-outline-variant flex justify-between items-center min-w-[600px]">
                <h3 className="text-headline-sm font-bold text-primary">Recent Generated Reports</h3>
                <button className="text-primary font-label-md hover:underline transition-all duration-300 active:scale-95">View All</button>
            </div>
            <table className="w-full text-left min-w-[600px]">
                <thead className="bg-surface-container-low text-label-md text-on-surface-variant border-b border-outline-variant">
                    <tr>
                        <th className="px-lg py-sm uppercase tracking-wider">Report Name</th>
                        <th className="px-lg py-sm uppercase tracking-wider text-center">Status</th>
                        <th className="px-lg py-sm uppercase tracking-wider text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                    {[
                        { name: 'Monthly Sales Recap - Oct 2024', status: 'Completed', style: 'bg-green-100 text-green-800' },
                        { name: 'Inventory Velocity Analysis', status: 'Completed', style: 'bg-green-100 text-green-800' },
                        { name: 'Q2 Customer Churn Report', status: 'Pending', style: 'bg-orange-100 text-orange-800' }
                    ].map((r) => (
                        <tr key={r.name} className="hover:bg-surface-container-low transition-colors duration-300 group">
                            <td className="px-lg py-md font-bold group-hover:text-primary transition-colors duration-300">{r.name}</td>
                            <td className="px-lg py-md text-center">
                                <span className={`text-[10px] px-sm py-xs rounded-full font-bold uppercase ${r.style}`}>{r.status}</span>
                            </td>
                            <td className="px-lg py-md text-right">
                                <button className="text-primary hover:opacity-70 cursor-pointer p-2 rounded-full hover:bg-surface-container-highest transition-all duration-300 active:scale-95"><span className="material-symbols-outlined">download</span></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
            <nav className="col-span-12 flex gap-md border-b border-outline-variant mb-sm overflow-x-auto">
                <button className="pb-md px-sm text-primary font-bold border-b-2 border-primary font-body-md whitespace-nowrap transition-all duration-300 active:scale-95">General</button>
                <button className="pb-md px-sm text-on-surface-variant hover:text-primary transition-colors font-body-md whitespace-nowrap active:scale-95">Security</button>
                <button className="pb-md px-sm text-on-surface-variant hover:text-primary transition-colors font-body-md whitespace-nowrap active:scale-95">Billing</button>
                <button className="pb-md px-sm text-on-surface-variant hover:text-primary transition-colors font-body-md whitespace-nowrap active:scale-95">Team</button>
            </nav>
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
                        <div className="flex flex-col gap-xs">
                            <label className="font-body-sm font-bold text-on-surface-variant">Business Email</label>
                            <input className="bg-surface-container-low border-outline-variant rounded-lg p-sm focus:ring-2 focus:ring-primary focus:bg-white focus:outline-none transition-all duration-300" type="email" defaultValue="contact@gorakshaknathmerchants.in"/>
                        </div>
                        <div className="flex flex-col gap-xs md:col-span-2">
                            <label className="font-body-sm font-bold text-on-surface-variant">Address</label>
                            <textarea className="bg-surface-container-low border-outline-variant rounded-lg p-sm focus:ring-2 focus:ring-primary focus:bg-white focus:outline-none transition-all duration-300" rows="2" defaultValue="14, MG Road, Koramangala, Bengaluru, KA 560034, India"/>
                        </div>
                    </div>
                </section>
                <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center gap-md mb-xl">
                        <span className="material-symbols-outlined text-primary bg-primary-fixed p-sm rounded-lg shadow-sm">notifications_active</span>
                        <h2 className="font-headline-sm">Notifications</h2>
                    </div>
                    <div className="flex flex-col gap-md">
                        {[
                            { t: 'Email Alerts', d: 'Receive daily transaction reports and order updates.' },
                            { t: 'SMS Alerts', d: 'Critical security alerts and high-value transaction pings.' }
                        ].map((n) => (
                            <div key={n.t} className="flex items-center justify-between p-md bg-surface-container-low rounded-lg transition-all duration-300 hover:bg-surface-container group">
                                <div><p className="font-bold group-hover:text-primary transition-colors">{n.t}</p><p className="text-body-sm text-on-surface-variant">{n.d}</p></div>
                                <label className="relative inline-flex items-center cursor-pointer hover:scale-105 active:scale-95 transition-transform">
                                    <input type="checkbox" className="sr-only peer" defaultChecked={n.t === 'Email Alerts'} />
                                    <div className="w-11 h-6 bg-outline rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-lg">
                <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center gap-md mb-xl">
                        <span className="material-symbols-outlined text-primary bg-primary-fixed p-sm rounded-lg shadow-sm">security</span>
                        <h2 className="font-headline-sm">Security</h2>
                    </div>
                    <div className="p-md bg-surface-container-low rounded-lg mb-md transition-all duration-300 hover:bg-surface-container">
                        <p className="font-bold">Two-Factor Auth</p>
                        <p className="text-body-sm text-on-surface-variant mb-md">Add an extra layer of security.</p>
                        <button className="text-primary font-bold text-body-sm hover:underline active:scale-95 transition-transform inline-block">Enable 2FA</button>
                    </div>
                    <button className="w-full flex items-center justify-between p-md bg-surface-container-low hover:bg-surface-container-high transition-all duration-300 active:scale-[0.98] rounded-lg group">
                        <span className="font-body-md group-hover:text-primary transition-colors">Reset Password</span>
                        <span className="material-symbols-outlined group-hover:translate-x-1 group-hover:text-primary transition-all">chevron_right</span>
                    </button>
                </section>
            </div>
        </div>
        <div className="fixed bottom-0 left-64 right-0 flex items-center justify-between bg-surface-container-highest/80 backdrop-blur-xl border-t border-white/20 p-md shadow-2xl z-40 animate-fade-in-up">
            <p className="text-on-surface-variant font-body-sm hidden md:block">Unsaved changes will be lost.</p>
            <div className="flex items-center gap-md w-full md:w-auto ml-auto">
                <button className="flex-1 md:flex-none px-xl py-md bg-white border border-outline-variant text-primary font-bold rounded-xl hover:bg-surface-container hover:-translate-y-0.5 active:scale-95 transition-all duration-300">Cancel</button>
                <button className="flex-1 md:flex-none px-xl py-md bg-primary text-on-primary font-bold rounded-xl hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 shadow-md shadow-primary/20 transition-all duration-300">Save Settings</button>
            </div>
        </div>
    </div>
);

// --- App Component ---

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activePage, setActivePage] = useState('dashboard');

    if (!isAuthenticated) {
        return <Login onLogin={() => setIsAuthenticated(true)} />;
    }

    const renderPage = () => {
        switch(activePage) {
            case 'dashboard': return <Dashboard />;
            case 'products': return <Products />;
            case 'customers': return <Customers />;
            case 'reports': return <Reports />;
            case 'settings': return <Settings />;
            default: return <Dashboard />;
        }
    };

    return (
        <MainWrapper activePage={activePage} setActivePage={setActivePage}>
            {renderPage()}
        </MainWrapper>
    );
};

export default App;
