import React from 'react'
import { Calendar, UtensilsCrossed } from 'lucide-react'

const ComboMainInformation = ({ combo }) => {
    if (!combo) return null

    const imagePath = combo.image?.replace(/\\/g, '/')
    const image = `http://localhost:5003/${imagePath}`
    const isActive = combo.status === "active"

    return (
        <div className="w-[737px] h-[201px] mx-[12px] mt-[8px] bg-white rounded-[14px] border border-[#E4E7EC] p-[20px] flex items-center gap-[28px] w-fit">
            <div className="relative shrink-0">
                <img
                    src={image}
                    alt={combo.name}
                    className="w-[240px] h-[160px] rounded-[10px] object-cover"
                />
                {isActive && (
                    <span className="absolute top-[10px] right-[10px] bg-[#ECFDF3] text-[#027A48] text-[11px] font-semibold px-[10px] py-[4px] rounded-full border border-[#6CE9A6]">
                        Active
                    </span>
                )}
                {!isActive && (
                    <span className="absolute top-[10px] right-[10px] bg-[#FEF3F2] text-[#B42318] text-[11px] font-semibold px-[10px] py-[4px] rounded-full border border-[#FDA29B]">
                        Inactive
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-[10px] min-w-[340px]">
                <div className="flex flex-col gap-[4px]">
                    <h1 className="text-[20px] font-bold text-[#101828] leading-[28px]">
                        {combo.name}
                    </h1>
                    <p className="text-[13px] text-[#667085] leading-[20px]">
                        {combo.description}
                    </p>
                </div>

                <div className="flex items-center gap-[28px] pt-[4px]">
                    <div className="flex flex-col gap-[4px]">
                        <span className="text-[11px] text-[#98A2B3] font-medium">Items</span>
                        <div className="flex items-center gap-[6px]">
                            <UtensilsCrossed size={14} className="text-[#667085]" />
                            <span className="text-[13px] font-semibold text-[#344054]">
                                {combo.items?.length ?? 0} items
                            </span>
                        </div>
                    </div>

                    <div className="w-[1px] h-[32px] bg-[#E4E7EC]" />

                    <div className="flex flex-col gap-[4px]">
                        <span className="text-[11px] text-[#98A2B3] font-medium">Price</span>
                        <span className="text-[14px] font-bold text-[#C25E0A]">
                            {Number(combo.price).toFixed(2)} MAD
                        </span>
                    </div>

                    <div className="w-[1px] h-[32px] bg-[#E4E7EC]" />

                    <div className="flex flex-col gap-[4px]">
                        <span className="text-[11px] text-[#98A2B3] font-medium">Status</span>
                        {isActive ? (
                            <span className="inline-flex items-center gap-[5px] bg-[#ECFDF3] text-[#027A48] text-[12px] font-semibold px-[10px] py-[3px] rounded-full w-fit">
                                <span className="w-[6px] h-[6px] rounded-full bg-[#12B76A]" />
                                Active
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-[5px] bg-[#FEF3F2] text-[#B42318] text-[12px] font-semibold px-[10px] py-[3px] rounded-full w-fit">
                                <span className="w-[6px] h-[6px] rounded-full bg-[#F04438]" />
                                Inactive
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-[6px] pt-[4px]">
                    <Calendar size={13} className="text-[#98A2B3]" />
                    <span className="text-[12px] text-[#667085]">
                        Combo ID: <span className="font-semibold text-[#344054]">#{combo.id}</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ComboMainInformation