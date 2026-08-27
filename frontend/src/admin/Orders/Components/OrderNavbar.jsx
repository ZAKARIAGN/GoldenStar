import React from 'react'
import {
  Bell,
  Menu,
  ChevronDown,
  Search
} from 'lucide-react'
import { avatar } from './Pictures'

const OrderNavbar = () => {
  return (
    <header className="w-full h-[80px] bg-white border-b border-gray-100 flex items-center px-6">

      <div className="flex items-center gap-6">

        <div className="relative w-[498px] h-[40px]">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search for orders..."
            className="
              w-full
              h-full
              rounded-[12px]
              border border-gray-200
              outline-none
              pl-11
              pr-4
              text-sm
              text-gray-700
              placeholder:text-gray-400
              focus:border-orange-400
              transition
            "
          />
        </div>

      </div>

      <div className="ml-auto flex items-center gap-5">

        <button
          className="
            relative
            w-[40px]
            h-[40px]
            flex
            items-center
            justify-center
            text-gray-700
            hover:bg-gray-50
            rounded-full
            transition
          "
        >
          <Bell size={21} />
          <span
            className="
              absolute
              top-[3px]
              right-[3px]
              w-[16px]
              h-[16px]
              bg-red-500
              text-white
              text-[9px]
              font-bold
              rounded-full
              flex
              items-center
              justify-center
            "
          >
            3
          </span>
        </button>

        <button
          className="
            h-[48px]
            flex
            items-center
            gap-3
            px-2
            rounded-[10px]
            hover:bg-gray-50
            transition
          "
        >
          <img
            src={avatar}
            alt="Admin"
            className="w-[36px] h-[36px] rounded-full object-cover"
          />

          <div className="text-left leading-tight">
            <p className="text-[13px] font-semibold text-gray-800">
              Admin
            </p>

            <p className="text-[11px] text-gray-500">
              Super Admin
            </p>
          </div>

          <ChevronDown
            size={16}
            className="text-gray-500 ml-1"
          />
        </button>

      </div>

    </header>
  )
}

export default OrderNavbar