import React from 'react';
import { ShoppingBag, Clock, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';

const OrderCards = ({orders}) => {

    const cards = [
        {
            title: "Total Orders",
            icon: <ShoppingBag size={20} className="text-orange-500" />,
            value: orders?.length,
            description: "All orders in system",
            bgColor: "bg-orange-100/60"
        },
        {
            title: "Pending",
            icon: <Clock size={20} className="text-amber-500" />,
            value: orders?.filter(order=>order.status.toLowerCase() ==='pending').length,
            description: "Waiting for confirmation",
            bgColor: "bg-amber-100/60"
        },
        {
            title: "In Progress",
            icon: <RefreshCw size={20} className="text-blue-500" />,
            value: orders?.filter(order=>order.status.toLowerCase() ==='preparing').length,
            description: "Being prepared",
            bgColor: "bg-blue-100/60"
        },
        {
            title: "Completed",
            icon: <CheckCircle2 size={20} className="text-emerald-500" />,
            value: orders?.filter(order=>order.status.toLowerCase() ==='confirmed').length,
            description: "Successfully delivered",
            bgColor: "bg-emerald-100/60"
        },
        {
            title: "Cancelled",
            icon: <XCircle size={20} className="text-rose-500" />,
            value: orders?.filter(order=>order.status.toLowerCase() ==='cancelled').length,
            description: "Cancelled orders",
            bgColor: "bg-rose-100/60"
        }
    ];

    return (
        <div className="flex flex-wrap gap-4 p-4 bg-gray-50 justify-center">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className="w-[193px] h-[97px] bg-white rounded-2xl p-3 border border-gray-100 shadow-sm flex flex-col justify-between"
                >
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${card.bgColor}`}>
                            {card.icon}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 font-medium truncate">
                                {card.title}
                            </span>
                            <span className="text-xl font-bold text-gray-800 leading-tight">
                                {card.value}
                            </span>
                        </div>
                    </div>
                    <p className="text-[10px] text-gray-400 truncate mt-1">
                        {card.description}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default OrderCards;