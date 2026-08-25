import React from "react";

const ComboItems = ({ items }) => {
    if (!items) return null;

    return (
        <div className="relative w-[916px] min-h-[350px]">

            {/* Title */}
            <h1 className="text-[20px] font-semibold text-[#101828] leading-[28px] mb-[16px]">
                Combo Items
            </h1>

            {/* Table */}
            <div className="relative w-full h-[265px] border border-[#F2F4F7] rounded-[4px] overflow-hidden">

                {/* Header */}
                <div className="h-[40px] bg-[#F9FAFB] flex items-center px-[10px]">

                    <div className="w-[285px] text-[12px] font-medium text-[#667085]">
                        Item
                    </div>

                    <div className="w-[205px] text-[12px] font-medium text-[#667085]">
                        Quantity
                    </div>

                    <div className="w-[205px] text-[12px] font-medium text-[#667085]">
                        Unit Price
                    </div>

                    <div className="w-[205px] text-right text-[12px] font-medium text-[#667085]">
                        Total Price
                    </div>

                </div>

                {/* Items */}
                <div className="h-[183px] overflow-y-auto">

                    {items.map((item, index) => {

                        const imagePath = item.imageUrl?.replace(/\\/g, "/");
                        const image = `http://localhost:5002/${imagePath}`;

                        return (
                            <div
                                key={index}
                                className="h-[57px] flex items-center px-[10px] border-t border-[#EAECF0]"
                            >

                                {/* Item */}
                                <div className="w-[285px] flex items-center gap-[10px]">

                                    <div className="w-[36px] h-[36px] shrink-0 rounded-[8px] border border-[#EAECF0] bg-white flex items-center justify-center">
                                        <img
                                            src={image}
                                            alt=""
                                            className="w-full h-full object-cover rounded-[8px]"
                                        />
                                    </div>

                                    <div className="flex flex-col min-w-0">

                                        <span className="text-[12px] font-semibold text-[#101828] leading-[18px] truncate">
                                            {item.name}
                                        </span>

                                        <span className="text-[11px] text-[#667085] leading-[16px] truncate">
                                            {item.description}
                                        </span>

                                    </div>

                                </div>

                                {/* Quantity */}
                                <div className="w-[205px] text-[12px] text-[#475467]">
                                    {item.quantity}
                                </div>

                                {/* Unit Price */}
                                <div className="w-[205px] text-[12px] text-[#475467]">
                                    {item.price} MAD
                                </div>

                                {/* Total */}
                                <div className="w-[205px] text-right text-[12px] text-[#475467]">
                                    {(item.price * item.quantity).toFixed(2)} MAD
                                </div>

                            </div>
                        );
                    })}

                </div>

                {/* Total Price - Always Bottom */}
                <div className="absolute bottom-0 left-0 w-full h-[42px] flex items-center justify-between px-[10px] bg-[#F9FAFB] border-t border-[#EAECF0]">

                    <span className="text-[12px] font-semibold text-[#101828]">
                        Total Price
                    </span>

                    <span className="text-[14px] font-bold text-[#C25E0A]">
                        {items
                            .reduce(
                                (total, item) =>
                                    total + item.price * item.quantity,
                                0
                            )
                            .toFixed(2)}{" "}
                        MAD
                    </span>

                </div>

            </div>
        </div>
    );
};

export default ComboItems;