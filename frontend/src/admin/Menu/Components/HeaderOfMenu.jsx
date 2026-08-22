import React from 'react'
import { Link } from 'react-router-dom'

const HeaderOfMenu = ({search,setSearch}) => {

    return (
        <div className="flex justify-between">

            <input
                type="text"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                placeholder="Search"
                className="p-2 bg-white w-[50%] h-[40px] border border-gray-500 rounded-[25px] focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <Link
                to="/admin/menu/add-item"
                className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-[25px] bg-[#C25E0A] text-white text-sm font-semibold shadow-sm hover:bg-[#A74E0F] hover:shadow-md hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200"
            >
                <span className="text-lg leading-none">+</span>
                Add New Menu
            </Link>

        </div>
    )
}

export default HeaderOfMenu