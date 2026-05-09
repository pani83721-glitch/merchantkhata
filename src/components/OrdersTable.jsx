import React from 'react';
import { recentOrders } from '../data';

export default function OrdersTable() {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
        <button className="text-[#24388C] text-sm font-bold hover:text-[#58D5F7] transition-colors bg-[#edf4ff] px-4 py-2 rounded-xl">
          View All
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 text-xs uppercase tracking-wider">
              <th className="pb-4 font-bold">Order ID</th>
              <th className="pb-4 font-bold">Customer</th>
              <th className="pb-4 font-bold">Time</th>
              <th className="pb-4 font-bold">Amount</th>
              <th className="pb-4 font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, index) => (
              <tr 
                key={index} 
                className="border-b border-gray-50 hover:bg-[#f8fafc] transition-colors duration-200 group last:border-0"
              >
                <td className="py-4 font-bold text-[#24388C] group-hover:text-[#58D5F7] transition-colors">{order.id}</td>
                <td className="py-4 text-gray-700 font-bold">{order.customer}</td>
                <td className="py-4 text-gray-500 text-sm font-medium">{order.time}</td>
                <td className="py-4 font-extrabold text-gray-900">{order.amount}</td>
                <td className="py-4">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                    order.status === 'Completed' 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-orange-100 text-orange-700 border border-orange-200'
                  }`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
