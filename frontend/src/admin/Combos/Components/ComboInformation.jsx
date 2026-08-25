import React from "react";

const ComboInformation = ({ combo }) => {

    const information = [
        {
            label: "Combo Name",
            value: combo?.name,
        },
        {
            label: "Status",
            value: (
                <span className="inline-flex items-center px-[9px] py-[3px] rounded-[6px] bg-[#ECFDF3] text-[#12B76A] text-[11px] font-medium">
                    {combo?.status}
                </span>
            ),
        },
        {
            label: "Description",
            value: (
                <span className="leading-[22px]">
                    {combo?.description}
                </span>
            ),
        },
        {
            label: "Price",
            value: combo?.price,
        },
        {
            label: "Created At",
            value: combo?.createdAt ? new Date(combo.createdAt).toLocaleString() : "—",
        },
        {
            label: "Updated At",
            value: combo?.updatedAt ? new Date(combo.updatedAt).toLocaleString() : "—",
        },
    ];

    return (
        <div className="w-[383px] min-h-[350px] bg-white rounded-[14px] border border-[#E4E7EC] p-[20px]">

            <h1 className="text-[20px] font-semibold text-[#101828] leading-[28px] mb-[18px]">
                Combo Information
            </h1>

            <div className="flex flex-col gap-[12px]">

                {information.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-start min-h-[23px]"
                    >
                        <div className="w-[178px] shrink-0 text-[12px] font-medium text-[#667085] leading-[22px]">
                            {item.label}
                        </div>

                        <div className="text-[12px] font-medium text-[#344054] leading-[22px]">
                            {item.value}
                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
};

export default ComboInformation;