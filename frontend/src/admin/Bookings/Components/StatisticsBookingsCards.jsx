import React from 'react';
import {
    CalendarDays,
    Clock3,
    CalendarCheck2,
    Hourglass,
    CheckCircle2,
    XCircle,
    TrendingUp,
} from 'lucide-react';

const BookingsCards = ({ bookings }) => {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const next7Days = new Date(today);
    next7Days.setDate(today.getDate() + 7);

    const todayStr = new Date().toISOString().split("T")[0];

    const cards = [
        {
            title: "Total Bookings",
            icon: <CalendarDays size={22} />,
            value: bookings?.length || 0,
            description: "All time bookings",
            color: "#F97316",
            bg: "#FFF7ED",
            border: "#FED7AA",
        },
        {
            title: "Today",
            icon: <Clock3 size={22} />,
            value: bookings?.filter(
                b => b.booking_date?.split("T")[0] === todayStr
            ).length || 0,
            description: "Bookings for today",
            color: "#8B5CF6",
            bg: "#F5F3FF",
            border: "#DDD6FE",
        },
        {
            title: "Upcoming (7d)",
            icon: <TrendingUp size={22} />,
            value: (() => {
                return bookings?.filter(b => {
                    const d = new Date(b.booking_date);
                    d.setHours(0, 0, 0, 0);
                    return d >= today && d < next7Days;
                }).length || 0;
            })(),
            description: "Next 7 days",
            color: "#3B82F6",
            bg: "#EFF6FF",
            border: "#BFDBFE",
        },
        {
            title: "Pending",
            icon: <Hourglass size={22} />,
            value: bookings?.filter(
                b => b.status?.toLowerCase() === "pending"
            ).length || 0,
            description: "Awaiting confirmation",
            color: "#F59E0B",
            bg: "#FFFBEB",
            border: "#FDE68A",
        },
        {
            title: "Confirmed",
            icon: <CheckCircle2 size={22} />,
            value: bookings?.filter(
                b => b.status?.toLowerCase() === "confirmed"
            ).length || 0,
            description: "Confirmed bookings",
            color: "#10B981",
            bg: "#ECFDF5",
            border: "#A7F3D0",
        },
        {
            title: "Cancelled",
            icon: <XCircle size={22} />,
            value: bookings?.filter(
                b => b.status?.toLowerCase() === "cancelled"
            ).length || 0,
            description: "Cancelled bookings",
            color: "#EF4444",
            bg: "#FEF2F2",
            border: "#FECACA",
        },
        {
            title: "This Month",
            icon: <CalendarCheck2 size={22} />,
            value: (() => {
                const now = new Date();
                return bookings?.filter(b => {
                    const d = new Date(b.booking_date);
                    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
                }).length || 0;
            })(),
            description: `${new Date().toLocaleString('default', { month: 'long' })} bookings`,
            color: "#6366F1",
            bg: "#EEF2FF",
            border: "#C7D2FE",
        },
    ];

    return (
        <div className="px-6 py-4 bg-gray-50">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        style={{
                            border: `1px solid ${card.border}`,
                        }}
                        className="rounded-2xl p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-default bg-white"
                    >
                        {/* Icon + Value row */}
                        <div className="flex items-center justify-between">
                            <div
                                style={{ color: card.color }}
                                className="opacity-90 "
                            >
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

export default BookingsCards;
