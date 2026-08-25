import React from "react";
import {
    ShoppingCart,
    DollarSign,
    Calculator,
    Package,
} from "lucide-react";

const Performance = ({ combo }) => {
    const cards = [
        {
            icon: <ShoppingCart size={20} />,
            value: 320,
            label: "Total Orders",
            iconBg: "bg-[#F3E8FF]",
            iconColor: "text-[#7C3AED]",
        },
        {
            icon: <DollarSign size={20} />,
            value: "1,245.00 $",
            label: "Total Sales",
            iconBg: "bg-[#DCFCE7]",
            iconColor: "text-[#16A34A]",
        },
        {
            icon: <Calculator size={20} />,
            value: "15.60 $",
            label: "Avg. Order Value",
            iconBg: "bg-[#FEF3C7]",
            iconColor: "text-[#F59E0B]",
        },
        {
            icon: <Package size={20} />,
            value: 24,
            label: "Items Sold",
            iconBg: "bg-[#DBEAFE]",
            iconColor: "text-[#3B82F6]",
        },
    ];

    return (
        <div className="w-[600px] h-[201px] mr-[8px] mt-[8px] bg-white rounded-[14px] border border-[#E4E7EC] p-[20px]">

            {/* Title */}
            <h1 className="text-[20px] font-bold text-[#101828] leading-[28px] mb-[20px]">
                Performance (This Month)
            </h1>

            {/* Cards */}
            <div className="flex items-center gap-[14px]">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="
                            w-[129px]
                            h-[119px]
                            rounded-[12px]
                            border
                            border-[#F0F2F5]
                            bg-[#FCFCFD]
                            p-[16px]
                            flex
                            flex-col
                            justify-between
                        "
                    >
                        {/* Icon */}
                        <div
                            className={`
                                w-[48px]
                                h-[48px]
                                rounded-[12px]
                                ${card.iconBg}
                                ${card.iconColor}
                                flex
                                items-center
                                justify-center
                            `}
                        >
                            {card.icon}
                        </div>

                        {/* Value + Label */}
                        <div className="flex flex-col gap-[4px]">
                            <span className="text-[20px] font-bold text-[#101828] leading-[32px]">
                                {card.value}
                            </span>

                            <span className="text-[11px] font-medium text-[#98A2B3] leading-[20px]">
                                {card.label}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Performance;