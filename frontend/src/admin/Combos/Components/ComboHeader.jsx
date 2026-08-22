import { PlusIcon, ChevronRight } from 'lucide-react'
import React from 'react' 

const ComboHeader = ({ setOpenForm,setOpenUpdateForm }) => {
  return (
    <div className="flex justify-between items-start px-0 pt-[13px] pb-[18px] mx-[12px]">
      <div className="flex flex-col">
        <h1 className="text-[24px] leading-[29px] font-bold text-[#101828]">
          Combos
        </h1>
        <div className="flex items-center gap-[7px] mt-[5px]">
          <span className="text-[12px] text-[#667085]">
            Dashboard
          </span>
          <ChevronRight
            size={13}
            strokeWidth={1.8}
            className="text-[#98A2B3]"
          />

          <span className="text-[12px] text-[#667085]">
            Combos
          </span>
        </div>
      </div>
      <button className="w-[157px] h-[39px] rounded-[8px] bg-[#C25E0A] text-white text-[14px] font-medium flex items-center justify-center gap-[8px] hover:bg-[#AD5208] transition-colors"
              onClick={() => {
                setOpenForm(true)
                setOpenUpdateForm(false)
              }}>
        <PlusIcon
          size={17}
          strokeWidth={2}
        />

        Add New Combo
      </button>

    </div>
  )
}

export default ComboHeader