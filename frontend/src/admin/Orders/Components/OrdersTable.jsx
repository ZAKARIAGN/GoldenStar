import React, { useState } from 'react';
import { Calendar, ChevronDown, Filter, Eye, MoreVertical } from 'lucide-react';

const OrdersTable = ({ orders }) => {
  const [activeTab, setActiveTab] = useState("All Orders");

  const tabs = [
    "All Orders",
    "Pending",
    "In Progress",
    "Completed",
    "Cancelled"
  ];

  const getStatusBadge = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case 'pending':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'in progress':
      case 'preparing':
      case 'confirmed':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'completed':
      case 'delivered':
      case 'ready':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'cancelled':
        return 'bg-rose-50 text-rose-600 border-rose-100';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="w-full flex flex-wrap items-center justify-between border-b border-gray-100 px-6 py-2 gap-4">
        <div className="flex items-center gap-6">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative py-4 text-sm font-medium transition-colors duration-200 ${
                  isActive ? 'text-orange-600 font-semibold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-orange-600 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3.5 py-2 border border-gray-200 rounded-xl text-sm font-medium text-slate-700 bg-white hover:bg-gray-50 transition-colors shadow-sm">
            <Filter size={16} className="text-slate-500" />
            <span>Filter</span>
          </button>

          <button className="flex items-center gap-2 px-3.5 py-2 border border-gray-200 rounded-xl text-sm font-medium text-slate-700 bg-white hover:bg-gray-50 transition-colors shadow-sm">
            <Calendar size={16} className="text-slate-500" />
            <span>May 20, 2024 - May 26, 2024</span>
            <ChevronDown size={16} className="text-slate-400" />
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/60 border-b border-gray-100 text-[13px] font-semibold text-slate-500">
              <th className="py-4 px-6">Order ID</th>
              <th className="py-4 px-6">Customer</th>
              <th className="py-4 px-6">Items</th>
              <th className="py-4 px-6">Total</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6">Date</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100 text-sm">
            {orders?.map((order) => {
              const nextItems = order.items && order.items.length > 1 ? `+ ${order.items.length - 1} more` : null;
              
              return (
                <tr key={order.id || order.ref} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-800 whitespace-nowrap">
                    {order?.ref || `#ORD-${order?.id}`}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img
                        src={order?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                        alt="avatar"
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800">{order?.name || "Unknown"}</span>
                        <span className="text-xs text-slate-400">{order?.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800">
                        {order?.items?.[0]?.name || "N/A"}
                      </span>
                      {nextItems && (
                        <span className="text-xs text-slate-400 font-medium">{nextItems}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 font-bold text-orange-600 whitespace-nowrap">
                    {order?.total_price} DH
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(order?.status)}`}>
                      {order?.status}
                    </span>
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-700">
                        {order?.created_at ? new Date(order.created_at.replace(" ", "T")).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "May 26, 2024"}
                      </span>
                      <span className="text-xs text-slate-400">
                        {order?.created_at ? new Date(order.created_at.replace(" ", "T")).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : "14:30"}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-slate-600 hover:text-slate-900 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-slate-600 hover:text-slate-900 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;