import React, { useState } from 'react'
import { House, Carrot, ChefHat, Calendar, Wallet, Settings, ChevronLeft, ChevronRight, UtensilsCrossed, Package } from "lucide-react";
import { Link, useLocation } from 'react-router-dom';

const SideBarAdmin = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const navbar = [
    { icon: <House />, title: "Dashboard", lien: "/admin/dashboard" },
    { icon: <Carrot />, title: "Menu", lien: "/admin/menu" },
    { icon: <Package />, title: "Combos", lien: "/admin/combos" },
    { icon: <ChefHat />, title: "Orders", lien: "/admin/orders" },
    { icon: <Calendar />, title: "Bookings", lien: "/admin/bookings" },
    { icon: <Wallet />, title: "Wallet", lien: "/admin/wallet" },
    { icon: <Settings />, title: "Settings", lien: "/admin/settings" },
  ];

  return (
    <div className={`relative ${open ? "w-[265px]" : "w-[90px]"} transition-all duration-400 ease-in-out min-h-screen bg-white border-r border-gray-100 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-50`}>

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="absolute top-10 -right-4 w-8 h-8 rounded-full bg-white border border-gray-100 shadow-md flex items-center justify-center text-gray-500 hover:text-[#C25E0A] hover:scale-110 transition-all z-50 cursor-pointer"
      >
        {open ? <ChevronLeft size={18} strokeWidth={2.5} /> : <ChevronRight size={18} strokeWidth={2.5} />}
      </button>

      {/* Logo Section */}
      <div className={`flex items-center ${open ? "px-6 gap-4" : "justify-center px-0"} py-8 border-b border-gray-50/80`}>
        <div className={`flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#C25E0A] to-[#e85d04] rounded-2xl shadow-lg shadow-[#C25E0A]/20 transition-all duration-300 ${open ? "w-12 h-12" : "w-10 h-10"}`}>
          <UtensilsCrossed size={open ? 24 : 20} className="text-white" strokeWidth={2} />
        </div>
        {open && (
          <div className="flex flex-col overflow-hidden whitespace-nowrap transition-opacity duration-300">
            <h1 className="text-[22px] font-bold text-gray-900 tracking-tight leading-tight">
              L&apos;Étoile d&apos;Or
            </h1>
            <p className="text-[11px] font-bold text-[#C25E0A] uppercase tracking-widest mt-1">
              Espace Admin
            </p>
          </div>
        )}
      </div>

      {/* Navigation Section */}
      <div className="flex-1 overflow-y-auto py-8 flex flex-col gap-2 no-scrollbar">
        {open && (
          <p className="px-8 mb-2 text-[11px] font-bold uppercase tracking-widest text-gray-400">
            Menu Principal
          </p>
        )}
        <nav className="flex flex-col gap-2 px-4">
          {navbar.map((item, index) => {
            // Highlight parent paths too, except for exact /admin (handled below)
            const isActive = location.pathname === item.lien || (location.pathname.startsWith(item.lien + "/") && item.lien !== "/admin");

            return (
              <Link
                key={index}
                to={item.lien}
                title={!open ? item.title : ""}
                className={`group flex items-center ${open ? "px-4 py-3.5" : "justify-center w-12 h-12 mx-auto"} rounded-2xl font-medium text-[15px] transition-all duration-300 relative
                  ${isActive
                    ? "bg-gradient-to-r from-[#C25E0A] to-[#e85d04] text-white shadow-md shadow-[#C25E0A]/20"
                    : "text-gray-500 hover:bg-[#FFF1E8] hover:text-[#C25E0A]"
                  }
                `}
              >
                <div className={`flex items-center justify-center transition-transform duration-300 ${isActive ? "" : "group-hover:scale-110"}`}>
                  {React.cloneElement(item.icon, {
                    size: 22,
                    strokeWidth: isActive ? 2.5 : 2
                  })}
                </div>

                {open && (
                  <span className="ml-4 tracking-wide whitespace-nowrap">{item.title}</span>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* User / Footer Section */}
      <div className={`mt-auto p-5 border-t border-gray-50 ${open ? "flex items-center gap-3" : "flex justify-center"}`}>
        <img src="https://ui-avatars.com/api/?name=Admin+User&background=FFF1E8&color=C25E0A&bold=true" alt="Admin" className={`rounded-full object-cover border-2 border-white shadow-sm transition-all duration-300 ${open ? "w-10 h-10" : "w-10 h-10"}`} />
        {open && (
          <div className="flex flex-col overflow-hidden whitespace-nowrap">
            <p className="text-[14px] font-bold text-gray-900">Admin User</p>
            <p className="text-[12px] text-gray-500 font-medium">admin@etoiledor.ma</p>
          </div>
        )}
      </div>

    </div>
  )
}

export default SideBarAdmin