import React from "react";
import {
    Package,
    ShoppingCart,
    PackageX,
    Wallet,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllComobos } from "../Services/CombosServices";

const StatisticsCards = () => {

    const { data: combos, isLoading: isLoadingCombos } = useQuery({
        queryKey: ["all-combos"],
        queryFn: getAllComobos,
    });

    const cards = [
        {
            title: "Total Combos",
            value: isLoadingCombos ? "..." : combos?.length || 0,
            description: "All combos in system",
            icon: <Package size={22} strokeWidth={2} />,
            color: "#F97316",
            border: "#FED7AA",
        },
        {
            title: "Active Combos",
            value: isLoadingCombos ? "..." : combos?.filter((combo) => combo.status === "active")?.length || 0,
            description: "Currently available",
            icon: <ShoppingCart size={22} strokeWidth={2} />,
            color: "#10B981",
            border: "#A7F3D0",
        },
        {
            title: "Inactive",
            value: isLoadingCombos ? "..." : combos?.filter((combo) => combo.status === "inactive")?.length || 0,
            description: "Not available",
            icon: <PackageX size={22} strokeWidth={2} />,
            color: "#EF4444",
            border: "#FECACA",
        },
        {
            title: "Total Sales (Month)",
            value: "1,245.00 $",
            description: "From combo orders",
            icon: <Wallet size={22} strokeWidth={2} />,
            color: "#3B82F6",
            border: "#BFDBFE",
            badge: "+15%",
        },
    ];

    return (
        <div className="px-3 py-4 bg-gray-50">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
                            <div className="flex items-center gap-2">
                                {card.badge && (
                                    <span className="text-[11px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
                                        {card.badge}
                                    </span>
                                )}
                                <span
                                    style={{ color: card.color }}
                                    className="text-2xl font-bold leading-none"
                                >
                                    {card.value}
                                </span>
                            </div>
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

export default StatisticsCards;