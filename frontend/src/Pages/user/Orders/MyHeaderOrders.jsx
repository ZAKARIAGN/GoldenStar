import React from "react";
import { ShoppingBag, ChevronRight, Sparkles } from "lucide-react";

const MyHeaderOrders = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8 pb-10 mb-10 border-b border-white/5 relative overflow-hidden bg-[#050505]">
      
      {/* Content Section */}
      <div className="flex flex-col gap-6 relative z-10">
        
        {/* Breadcrumb - Elegant Gold touch */}
        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">
          <span className="hover:text-[#D4AF37] transition-colors cursor-pointer">Tableau de bord</span>
          <ChevronRight size={12} className="text-[#D4AF37]/50" />
          <span className="text-[#D4AF37]">Commandes</span>
        </div>

        <div className="space-y-3">
          <h1
            className="text-5xl md:text-7xl text-white font-serif leading-tight"
          >
            Gestion des <span className="italic font-light text-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]">Commandes</span>
          </h1>
          
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-[#D4AF37]/40"></div>
            <p className="text-gray-400 text-sm md:text-base max-w-lg font-medium tracking-wide">
              Suivez vos ventes en temps réel et gérez les demandes de vos clients avec la précision de <span className="text-white italic">L'Étoile d'Or</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Quick View - Modern Glassmorphism */}
      <div className="flex items-center gap-4 relative z-10">
        <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 p-5 rounded-[2rem] shadow-2xl flex items-center gap-5 transition-all hover:border-[#D4AF37]/30">
          <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center text-[#D4AF37] shadow-[inset_0_0_15px_rgba(212,175,55,0.1)]">
            <ShoppingBag size={26} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Sparkles size={10} className="text-[#D4AF37]" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37]/60">Flux de Prestige</p>
            </div>
            <p className="text-xl font-serif font-bold text-white mt-0.5">L'Étoile d'Or</p>
          </div>
        </div>
      </div>

      {/* Background Glow Accent */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none"></div>
    </div>
  );
};

export default MyHeaderOrders;