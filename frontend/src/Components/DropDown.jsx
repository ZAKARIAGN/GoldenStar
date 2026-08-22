import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { User, LogOut, Settings, ChevronDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Dropdown = ({ DropItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 group p-1 focus:outline-none"
      >
        <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] group-hover:border-[#D4AF37]/60 group-hover:bg-[#D4AF37]/10 transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.3)] group-hover:shadow-[#D4AF37]/10">
          <User size={18} strokeWidth={1.5} />
        </div>
        <ChevronDown 
          size={14} 
          className={`text-[#D4AF37]/60 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 mt-4 w-64 bg-[#0A0A0A]/95 backdrop-blur-2xl border border-[#D4AF37]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-[100] overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-white/5 bg-white/[0.02]">
                <p className="text-[10px] text-[#D4AF37] font-black tracking-[0.2em] uppercase opacity-70 flex items-center gap-2">
                   <Sparkles size={10} /> Mon Espace Royal
                </p>
            </div>

            <div className="py-2">
              {DropItems.map((item, index) => {
                let icon = <Settings size={16} strokeWidth={1.5} />;
                let styleClasses = "text-gray-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/5";

                if (item.type === "signout" || item.name.toLowerCase().includes("out")) {
                  icon = <LogOut size={16} strokeWidth={1.5} />;
                  styleClasses = "text-rose-400/70 hover:bg-rose-500/10 hover:text-rose-400";
                }

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-4 px-5 py-3.5 text-[11px] font-bold tracking-[0.15em] transition-all duration-300 uppercase group ${styleClasses}`}
                    >
                      <span className="transition-transform duration-300 group-hover:scale-110">{icon}</span>
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
    
            <div className="bg-[#D4AF37]/5 px-4 py-3 border-t border-[#D4AF37]/10 flex justify-center items-center gap-2">
                <div className="w-1 h-1 bg-[#D4AF37] rounded-full animate-pulse" />
                <p className="text-[8px] text-[#D4AF37]/60 text-center font-black tracking-[0.3em] uppercase">
                  L'Étoile d'Or Premium
                </p>
                <div className="w-1 h-1 bg-[#D4AF37] rounded-full animate-pulse" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;