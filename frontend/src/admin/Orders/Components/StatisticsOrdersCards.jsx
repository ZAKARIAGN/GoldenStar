import React from 'react';
import { ShoppingBag, XCircle, Truck, PackageCheck, ChefHat, BadgeCheck, Clock3 } from 'lucide-react';

const OrderCards = ({orders}) => {

    const cards = [
    {
        title: "Total Orders",
        icon: <ShoppingBag size={20} className="text-orange-500" />,
        value: orders?.length || 0,
        description: "All orders in system",
        bgColor: "bg-orange-100/60"
    },
    {
        title: "Pending",
        icon: <Clock3 size={20} className="text-amber-500" />,
        value: orders?.filter(
            order => order.status?.toLowerCase() === "pending"
        ).length || 0,
        description: "Waiting for confirmation",
        bgColor: "bg-amber-100/60"
    },
    {
        title: "Confirmed",
        icon: <BadgeCheck size={20} className="text-blue-500" />,
        value: orders?.filter(
            order => order.status?.toLowerCase() === "confirmed"
        ).length || 0,
        description: "Order confirmed",
        bgColor: "bg-blue-100/60"
    },
    {
        title: "Preparing",
        icon: <ChefHat size={20} className="text-indigo-500" />,
        value: orders?.filter(
            order => order.status?.toLowerCase() === "preparing"
        ).length || 0,
        description: "Being prepared",
        bgColor: "bg-indigo-100/60"
    },
    {
        title: "Ready",
        icon: <PackageCheck size={20} className="text-emerald-500" />,
        value: orders?.filter(
            order => order.status?.toLowerCase() === "ready"
        ).length || 0,
        description: "Ready for delivery",
        bgColor: "bg-emerald-100/60"
    },
    {
        title: "Delivered",
        icon: <Truck size={20} className="text-green-600" />,
        value: orders?.filter(
            order => order.status?.toLowerCase() === "delivered"
        ).length || 0,
        description: "Successfully delivered",
        bgColor: "bg-green-100/60"
    },
    {
        title: "Cancelled",
        icon: <XCircle size={20} className="text-rose-500" />,
        value: orders?.filter(
            order => order.status?.toLowerCase() === "cancelled"
        ).length || 0,
        description: "Cancelled orders",
        bgColor: "bg-rose-100/60"
    }
];

    return (
        <div className="flex flex-wrap gap-4 p-4 bg-gray-50 justify-center">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className="w-[160px] h-[97px] bg-white rounded-2xl p-3 border border-gray-100 shadow-sm flex flex-col justify-between"
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