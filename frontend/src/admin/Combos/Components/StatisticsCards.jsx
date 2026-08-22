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


    const { data:combos, isLoading:isLoadingCombos } = useQuery({
        queryKey: ["all-combos"],
        queryFn: getAllComobos,
    })


    const cards = [
        {
            title: "Total Combos",
            value: isLoadingCombos ? "..." :combos?.length,
            description: "All combos in system",
            icon: <Package size={24} strokeWidth={2} />,
            iconClass: "bg-orange-50 text-orange-500",
            width:"270px"
        },
        {
            title: "Active Combos",
            value: isLoadingCombos ? "..." :combos?.filter((combo) => combo.status === "active")?.length,
            description: "Currently available",
            icon: <ShoppingCart size={24} strokeWidth={2} />,
            iconClass: "bg-green-50 text-green-500",
            width:"258px"
        },
        {
            title: "Out of Stock",
            value:isLoadingCombos ? "..." :combos?.filter((combo) => combo.status === "inactive")?.length,
            description: "Not available",
            icon: <PackageX size={24} strokeWidth={2} />,
            iconClass: "bg-red-50 text-red-500",
            width:"257px"   
        },
        {
            title: "Total Sales (This Month)",
            value: "1,245.00 $",
            description: "From combo orders",
            icon: <Wallet size={24} strokeWidth={2} />,
            iconClass: "bg-blue-50 text-blue-500",
            percentage: "+15%",
            width:"263px"
        },
    ];

    return (
        <div className="grid grid-cols-4 gap-2 w-full mx-[12px]">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className={`
                        ${card.width}
                        h-[142px]
                        rounded-xl
                        border border-gray-100
                        bg-white
                        px-5
                        py-5
                        flex items-start
                        gap-4
                        shadow-sm
                    `}
                >
                    {/* Icon */}
                    <div
                        className={`
                            w-[52px] h-[52px]
                            rounded-xl
                            flex items-center justify-center
                            shrink-0
                            ${card.iconClass}
                        `}
                    >
                        {card.icon}
                    </div>

                    {/* Content */}
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <p className="text-[13px] font-medium text-gray-500 whitespace-nowrap">
                                {card.title}
                            </p>

                            {card.percentage && (
                                <span className="
                                    text-[11px]
                                    font-semibold
                                    text-green-600
                                    bg-green-50
                                    px-2 py-1
                                    rounded-md
                                ">
                                    {card.percentage}
                                </span>
                            )}
                        </div>

                        <h3 className="
                            mt-1
                            text-[23px]
                            leading-7
                            font-bold
                            text-gray-900
                        ">
                            {card.value}
                        </h3>

                        <p className="
                            mt-1
                            text-[12px]
                            text-gray-400
                        ">
                            {card.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatisticsCards;