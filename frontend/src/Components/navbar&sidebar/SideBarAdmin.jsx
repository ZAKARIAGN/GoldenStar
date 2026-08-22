import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Utensils,
  ShoppingBag,
  Calendar,
  Menu as MenuIcon,
  X,
  LayoutDashboard,
  ChevronRight,
  ChevronLeft,
  Sparkles
} from "lucide-react";

const SideBarAdmin = () => {
  const location = useLocation();
  const [isCollapse, setIsCollapse] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Dishes", path: "/admin/dishes", icon: <Utensils size={20} /> },
    { name: "Orders", path: "/admin/orders", icon: <ShoppingBag size={20} /> },
    { name: "Reservations", path: "/admin/reservations", icon: <Calendar size={20} /> },
  ];

  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      <div className="md:hidden fixed top-5 left-5 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-3 bg-black border border-[#D4AF37]/30 text-[#D4AF37] rounded-2xl shadow-2xl active:scale-95 transition-all"
        >
          {isMobileOpen ? <X size={22} /> : <MenuIcon size={22} />}
        </button>
      </div>

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:sticky top-0 left-0 z-40
          bg-[#0A0A0A] text-gray-400 min-h-screen 
          flex flex-col border-r border-white/5 shadow-2xl transition-all duration-500 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${isCollapse ? "md:w-24" : "md:w-72"}
          w-72
        `}
      >
        <div className="h-28 flex items-center px-8 gap-4 border-b border-white/5 relative">
          <div className={`flex items-center gap-4 ${isCollapse ? "md:justify-center w-full" : ""}`}>
            <div className="w-11 h-11 bg-gradient-to-br from-[#8B6508] to-[#D4AF37] rounded-2xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(212,175,55,0.2)] shrink-0">
               <Utensils size={22} strokeWidth={2.5} />
            </div>
            
            {(!isCollapse || isMobileOpen) && (
              <div className="overflow-hidden">
                <h1 className="text-xl font-serif text-white whitespace-nowrap tracking-tight">
                  L’Étoile <span className="text-[#D4AF37] italic font-light">d’Or</span>
                </h1>
                <div className="flex items-center gap-2">
                   <Sparkles size={10} className="text-[#D4AF37]" />
                   <p className="text-[9px] uppercase tracking-[0.3em] font-black text-[#D4AF37]/60">Espace Admin</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
            onClick={() => setIsCollapse(!isCollapse)}
            className="hidden md:flex absolute -right-3 top-12 w-7 h-7 bg-[#0A0A0A] border border-white/10 rounded-full items-center justify-center text-[#D4AF37] shadow-xl hover:border-[#D4AF37]/50 hover:bg-[#111] transition-all z-50"
          >
            {isCollapse ? <ChevronRight size={14}/> : <ChevronLeft size={14}/>}
        </button>

        <nav className="flex flex-col mt-10 gap-2 px-4">
          <p className={`text-[#D4AF37]/40 text-[9px] font-black uppercase mb-4 px-4 tracking-[0.4em] ${isCollapse && 'md:hidden'}`}>
            Gestion Royale
          </p>
          
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={`
                  relative flex items-center gap-4 px-5 py-4 rounded-[1.5rem] transition-all duration-500 group
                  ${isActive
                    ? "bg-[#D4AF37]/10 text-[#D4AF37] font-bold"
                    : "hover:bg-white/[0.03] hover:text-white"
                  }
                  ${isCollapse ? "md:justify-center md:px-0" : ""}
                `}
              >
                {isActive && (
                    <div className="absolute inset-0 border border-[#D4AF37]/30 rounded-[1.5rem]" />
                )}

                <span className={`shrink-0 transition-all duration-500 group-hover:scale-110 ${isActive ? "text-[#D4AF37]" : "text-gray-600 group-hover:text-[#D4AF37]/70"}`}>
                    {item.icon}
                </span>
                
                <span className={`text-[11px] font-black uppercase tracking-[0.2em] ${isCollapse ? "md:hidden" : "block"}`}>
                  {item.name}
                </span>

                {isCollapse && (
                    <div className="absolute left-20 bg-[#D4AF37] text-black font-black text-[9px] uppercase tracking-widest py-2 px-4 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-x-2 group-hover:translate-x-0 whitespace-nowrap z-50 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                        {item.name}
                    </div>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto p-8">
            {!isCollapse ? (
                <div className="bg-white/[0.02] rounded-[2rem] p-6 border border-white/5 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <p className="relative z-10 text-[10px] text-white/50 font-black uppercase tracking-widest">Aide & Support</p>
                    <button className="relative z-10 text-[9px] text-[#D4AF37] underline font-black mt-2 tracking-widest hover:text-white transition-colors">
                        CONCIERGERIE TECHNIQUE
                    </button>
                </div>
            ) : (
                <div className="flex justify-center">
                    <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-[#D4AF37]/30">
                        ?
                    </div>
                </div>
            )}
        </div>
      </aside>
    </>
  );
};

export default SideBarAdmin;