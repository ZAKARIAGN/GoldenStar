import React from 'react';
import {
    ShoppingBag,
    XCircle,
    Truck,
    PackageCheck,
    ChefHat,
    BadgeCheck,
    Clock3,
} from 'lucide-react';

const OrderCards = ({ orders }) => {

    const cards = [
        {
            title: "Total Orders",
            icon: <ShoppingBag size={22} />,
            value: orders?.length || 0,
            description: "All orders in system",
            color: "#F97316",
            border: "#FED7AA",
        },
        {
            title: "Pending",
            icon: <Clock3 size={22} />,
            value: orders?.filter(
                order => order.status?.toLowerCase() === "pending"
            ).length || 0,
            description: "Waiting for confirmation",
            color: "#F59E0B",
            border: "#FDE68A",
        },
        {
            title: "Confirmed",
            icon: <BadgeCheck size={22} />,
            value: orders?.filter(
                order => order.status?.toLowerCase() === "confirmed"
            ).length || 0,
            description: "Order confirmed",
            color: "#3B82F6",
            border: "#BFDBFE",
        },
        {
            title: "Preparing",
            icon: <ChefHat size={22} />,
            value: orders?.filter(
                order => order.status?.toLowerCase() === "preparing"
            ).length || 0,
            description: "Being prepared",
            color: "#6366F1",
            border: "#C7D2FE",
        },
        {
            title: "Ready",
            icon: <PackageCheck size={22} />,
            value: orders?.filter(
                order => order.status?.toLowerCase() === "ready"
            ).length || 0,
            description: "Ready for delivery",
            color: "#10B981",
            border: "#A7F3D0",
        },
        {
            title: "Delivered",
            icon: <Truck size={22} />,
            value: orders?.filter(
                order => order.status?.toLowerCase() === "delivered"
            ).length || 0,
            description: "Successfully delivered",
            color: "#16A34A",
            border: "#BBF7D0",
        },
        {
            title: "Cancelled",
            icon: <XCircle size={22} />,
            value: orders?.filter(
                order => order.status?.toLowerCase() === "cancelled"
            ).length || 0,
            description: "Cancelled orders",
            color: "#EF4444",
            border: "#FECACA",
        },
    ];

    return (
        <div className="px-6 py-4 bg-gray-50">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        style={{ border: `1px solid ${card.border}` }}
                        className="rounded-2xl p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-default bg-white"
                    >
                        {/* Icon + Value row */}
                        <div className="flex items-center justify-between">
                            <div style={{ color: card.color }} className="opacity-90">
                                {card.icon}
                            </div>
                            <span
                                style={{ color: card.color }}
                                className="text-2xl font-bold leading-none"
                            >
                                {card.value}
                            </span>
                        </div>

                        {/* Title + Description */}
                        <div>
                            <p className="text-[13px] font-semibold text-gray-700 leading-tight">
                                {card.title}
                            </p>
                            <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">
                                {card.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderCards;