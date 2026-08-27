import { ChevronRight } from 'lucide-react'

const OrderHeader = () => {
  return (
    <div className="flex justify-between items-start px-0 pt-[13px] pb-[18px] mx-[12px]">
      <div className="flex flex-col">
        <h1 className="text-[24px] leading-[29px] font-bold text-[#101828]">
          Orders
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
            Orders
          </span>
        </div>
      </div>

    </div>
  )
}

export default OrderHeader