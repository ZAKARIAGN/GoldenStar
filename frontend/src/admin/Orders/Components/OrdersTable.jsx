import React, { useMemo, useState } from 'react';
import { Calendar, ChevronDown, Filter, Eye, MoreVertical } from 'lucide-react';
import { updateOrderStatus } from '../Services/OrdersServices';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const OrdersTable = ({ orders }) => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("All Orders");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statusToUpdate, setStatusToUpdate] = useState("");

  const tabs = [
    "All Orders",
    "Pending",
    "Confirmed",
    "Preparing",
    "Ready",
    "Delivered",
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



  const mutation = useMutation({
    mutationFn: ({ orderId, status }) => updateOrderStatus(orderId, { status }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success(data?.message || "Order status updated successfully", {
        autoClose: 4000,
        position: "top-right",
        icon: "✅",
        style: {
          background: "#fff",
          color: "#18181b",
          border: "1px solid #cefeca",
          borderRadius: "14px",
          padding: "14px 18px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
          fontSize: "14px",
          fontWeight: "600",
        },
      });
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "Something went wrong";

      toast.error(message, {
        autoClose: 4000,
        position: "top-right",
        icon: "⚠️",
        style: {
          background: "#fff",
          color: "#18181b",
          border: "1px solid #fecaca",
          borderRadius: "14px",
          padding: "14px 18px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
          fontSize: "14px",
          fontWeight: "600",
        },
      });
    }
  })


  const HandleStatusChange = (orderId, status) => {
    setStatusToUpdate(status);
    mutation.mutate({ orderId, status });
  }


  const filteredOrders = useMemo(() => {
    let ordersData = orders;
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      ordersData = ordersData.filter((order) => {
        const orderDate = new Date(order.created_at);
        return orderDate >= start && orderDate <= end;
      });
    }
    if (activeTab !== "All Orders") {
      ordersData = ordersData.filter((order) => order.status === activeTab.toLocaleLowerCase());
    }
    return ordersData;
  }, [orders, startDate, endDate, activeTab]);

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
                className={`relative py-4 text-sm font-medium transition-colors duration-200 ${isActive ? 'text-orange-600 font-semibold' : 'text-slate-500 hover:text-slate-800'
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

          <div className="flex items-center gap-2 px-3.5 py-2 border border-gray-200 rounded-xl text-sm font-medium text-slate-700 bg-white hover:bg-gray-50 transition-colors shadow-sm">
            <Calendar size={16} className="text-slate-500" />
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className='border-none outline-none' />
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 border border-gray-200 rounded-xl text-sm font-medium text-slate-700 bg-white hover:bg-gray-50 transition-colors shadow-sm">
            <Calendar size={16} className="text-slate-500" />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className='border-none outline-none' />
          </div>
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
            {filteredOrders?.map((order) => {
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
                    <div className="relative inline-block">
                      <select
                        name="statusToUpdate"
                        id="statusToUpdate"
                        value={statusToUpdate || order?.status}
                        onChange={(e) =>
                          HandleStatusChange(order?.id, e.target.value)
                        }
                        className={`appearance-none pl-3 pr-9 py-2 rounded-full text-xs font-semibold cursor-pointer outline-none border transition-all duration-200 shadow-sm ${getStatusBadge(statusToUpdate || order?.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="preparing">Preparing</option>
                        <option value="ready">Ready</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>

                      {/* Custom Arrow */}
                      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m6 9 6 6 6-6"
                          />
                        </svg>
                      </div>
                    </div>
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