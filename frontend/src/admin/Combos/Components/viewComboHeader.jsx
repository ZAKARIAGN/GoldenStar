import { ArrowLeft, ChevronRight, Trash } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import React from 'react'

const viewComboHeader = ({ handleDeleteCombo }) => {
    return (
        <div className="flex justify-between items-start px-0 pt-[13px] pb-[18px] mx-[12px]">
            <div className="flex flex-col">
                <h1 className="text-[24px] leading-[29px] font-bold text-[#101828]">
                    Combo Details
                </h1>
                <div className="flex items-center gap-[7px] mt-[5px]">
                    <span className="text-[12px] text-[#667085]">
                        Combos
                    </span>
                    <ChevronRight
                        size={13}
                        strokeWidth={1.8}
                        className="text-[#98A2B3]"
                    />

                    <span className="text-[12px] text-[#667085]">
                        Combo details
                    </span>
                </div>
            </div>
            <div className='flex gap-[12px]'>
                <Link to="/admin/combos" className="w-[157px] h-[39px] rounded-[8px] border hover:border-[#C25E0A] hover:text-[#C25E0A] text-[14px] font-medium flex items-center justify-center gap-[8px] transition-colors"
                >
                    <ArrowLeft
                        size={17}
                        strokeWidth={2}
                    />

                    back to combos
                </Link>
                <button onClick={handleDeleteCombo} className="w-[157px] h-[39px] rounded-[8px] bg-[#F65151] text-white text-[14px] font-medium flex items-center justify-center gap-[8px] hover:bg-[#AD5208] transition-colors"
                >
                    <Trash
                        size={17}
                        strokeWidth={2}
                    />

                    delete Combo
                </button>
            </div>


        </div>
    )
}

export default viewComboHeader