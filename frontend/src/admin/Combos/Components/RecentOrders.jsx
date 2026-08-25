import React from "react";

const RecentOrders = () => {
    const orders = [
        {
            id: "#ORD-0001",
            customer: "Yassine Amrani",
            date: "May 25, 2024 14:30",
            items: "1 × Classic Burger Combo",
            total: "14.99 $",
            status: "Completed",
        },
        {
            id: "#ORD-0002",
            customer: "Fatima Zahra",
            date: "May 25, 2024 13:15",
            items: "2 × Classic Burger Combo",
            total: "29.98 $",
            status: "Completed",
        },
        {
            id: "#ORD-0003",
            customer: "Mohamed Reda",
            date: "May 25, 2024 12:45",
            items: "1 × Classic Burger Combo",
            total: "14.99 $",
            status: "Pending",
        },
    ];

    return (
        <div className="w-[800px] min-h-[216px] bg-white rounded-[14px] border border-[#E4E7EC] p-[20px]">
            <h1 className="text-[20px] font-semibold text-[#101828] leading-[28px] mb-[12px]">
                Recent Orders
            </h1>
            <div className="w-full overflow-hidden rounded-[4px]">
                <div className="h-[31px] bg-[#F9FAFB] flex items-center px-[10px]">

                    <div className="w-[104px] text-[11px] font-medium text-[#667085]">
                        Order ID
                    </div>

                    <div className="w-[144px] text-[11px] font-medium text-[#667085]">
                        Customer
                    </div>

                    <div className="w-[166px] text-[11px] font-medium text-[#667085]">
                        Date
                    </div>

                    <div className="w-[209px] text-[11px] font-medium text-[#667085]">
                        Items
                    </div>

                    <div className="w-[74px] text-[11px] font-medium text-[#667085]">
                        Total
                    </div>

                    <div className="w-[74px] text-[11px] font-medium text-[#667085]">
                        Status
                    </div>

                </div>
                {orders.map((order, index) => (
                    <div
                        key={index}
                        className="h-[47px] flex items-center px-[10px] border-b border-[#EAECF0]"
                    >

                        <div className="w-[104px] text-[12px] font-semibold text-[#101828]">
                            {order.id}
                        </div>
                        <div className="w-[144px] text-[12px] font-medium text-[#344054]">
                            {order.customer}
                        </div>
                        <div className="w-[166px] text-[12px] text-[#475467]">
                            {order.date}
                        </div>
                        <div className="w-[209px] text-[12px] text-[#344054]">
                            {order.items}
                        </div>
                        <div className="w-[74px] text-[12px] font-semibold text-[#344054]">
                            {order.total}
                        </div>
                        <div className="flex-1">
                            <span
                                className={`
                                    w-[74px]
                                    inline-flex
                                    items-center
                                    px-[9px]
                                    py-[3px]
                                    rounded-[6px]
                                    text-[10px]
                                    font-semibold
                                    ${
                                        order.status === "Completed"
                                            ? "bg-[#ECFDF3] text-[#12B76A]"
                                            : "bg-[#FFFAEB] text-[#F79009]"
                                    }
                                `}
                            >
                                {order.status}
                            </span>
                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
};

export default RecentOrders;