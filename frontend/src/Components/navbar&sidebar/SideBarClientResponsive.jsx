import React from "react";
import { Link } from "react-router-dom";
import { X, ChevronRight, Instagram, Facebook, MapPin, Phone, Crown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SideBarClientResponsive = ({ isOpen, navBar, toggleMenu, currentPath }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] md:hidden"
          />

          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-[#0A0A0A]/95 backdrop-blur-2xl z-[110] md:hidden shadow-[20px_0_50px_rgba(0,0,0,0.8)] border-r border-[#D4AF37]/20"
          >
            <div className="flex flex-col h-full p-8 relative overflow-hidden">

              <div className="absolute top-[-5%] left-[-5%] w-32 h-32 bg-[#D4AF37]/10 blur-[50px] rounded-full" />

              <div className="flex justify-between items-center mb-12">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <Crown size={14} className="text-[#D4AF37]" />
                    <span className="text-white font-serif font-black text-xl tracking-[0.1em] uppercase">
                      L'ÉTOILE <span className="text-[#D4AF37] italic font-light">D'OR</span>
                    </span>
                  </div>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-[#D4AF37] to-transparent mt-2" />
                </div>
                <button
                  onClick={toggleMenu}
                  className="p-2 bg-white/5 text-[#D4AF37] rounded-full active:scale-90 transition-all border border-[#D4AF37]/20 hover:bg-[#D4AF37]/10"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                {navBar.map((item, index) => {
                  const isActive = currentPath === item.path;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Link
                        to={item.path}
                        onClick={toggleMenu}
                        className={`group flex items-center justify-between py-4 px-5 rounded-2xl transition-all duration-500 border ${isActive
                            ? "bg-[#D4AF37]/10 border-[#D4AF37]/40 text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.1)]"
                            : "text-gray-400 border-transparent hover:border-white/10 hover:bg-white/5 hover:text-white"
                          }`}
                      >
                        <span className="text-[11px] font-black tracking-[0.25em] uppercase font-sans">
                          {item.name}
                        </span>
                        <ChevronRight
                          size={16}
                          className={`transition-all duration-500 ${isActive ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"}`}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mt-auto space-y-8">
                <div className="bg-white/[0.03] p-6 rounded-3xl space-y-4 border border-white/5 shadow-inner">
                  <div className="flex items-center gap-4 text-gray-300 text-[10px] font-bold tracking-widest uppercase">
                    <MapPin size={14} className="text-[#D4AF37]" />
                    <span>Casablanca, Maroc</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-300 text-[10px] font-bold tracking-widest uppercase">
                    <Phone size={14} className="text-[#D4AF37]" />
                    <span>+212 5XX XX XX XX</span>
                  </div>

                  <div className="flex gap-5 pt-2">
                    <Instagram size={20} className="text-gray-500 hover:text-[#D4AF37] transition-all cursor-pointer transform hover:-translate-y-1" />
                    <Facebook size={20} className="text-gray-500 hover:text-[#D4AF37] transition-all cursor-pointer transform hover:-translate-y-1" />
                  </div>
                </div>

                <Link
                  to="/user/menu"
                  onClick={toggleMenu}
                  className="relative group flex justify-center items-center w-full overflow-hidden p-[1px] rounded-2xl transition-all duration-300 active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8B6508] via-[#C25E0A] to-[#8B6508] animate-[shimmer_3s_infinite]" />
                  <div className="relative w-full bg-[#0A0A0A] group-hover:bg-transparent py-4 rounded-2xl transition-all duration-500 flex justify-center items-center">
                    <span className="text-[#D4AF37] group-hover:text-black font-black uppercase text-[10px] tracking-[0.3em]">
                      Commander Maintenant
                    </span>
                  </div>
                </Link>
              </div>
            </div>
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] -z-10" />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideBarClientResponsive;