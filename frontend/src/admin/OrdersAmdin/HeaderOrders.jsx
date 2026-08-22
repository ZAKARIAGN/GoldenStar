import React from "react";
import { Download, ShoppingBag, Sparkles, FileSpreadsheet } from "lucide-react";

const HeaderOrders = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8 pb-10 mb-10 border-b border-white/5 animate-in fade-in slide-in-from-top-4 duration-700 relative overflow-hidden">


      <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#D4AF37]/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="flex flex-col gap-4 relative z-10">
        <div className="flex items-center gap-3 text-[#D4AF37]/60">
          <ShoppingBag size={18} />
          <span className="text-[10px] uppercase tracking-[0.5em] font-black">Registre des Ventes</span>
          <Sparkles size={12} className="animate-pulse" />
        </div>

        <h1
          className="text-4xl md:text-6xl text-white font-serif tracking-tight leading-tight"
        >
          Suivi des <span className="text-[#D4AF37] italic font-light">Commandes</span>
        </h1>

        <div className="flex items-center gap-4">
          <div className="h-[1px] w-12 bg-[#D4AF37]/30" />
          <p className="text-gray-500 text-xs md:text-sm uppercase tracking-[0.2em] font-light max-w-md">
            Gérez l'effervescence de votre salle et les réservations en temps réel.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 relative z-10">

        <button className="relative group p-[1px] overflow-hidden rounded-2xl transition-all duration-700 active:scale-95">

          <div className="absolute inset-0 bg-gradient-to-r from-[#8B6508] via-[#C25E0A] to-[#8B6508] animate-[shimmer_4s_infinite]" />

          <div className="relative bg-[#0A0A0A] rounded-[calc(1rem-1px)] py-4 px-8 flex items-center gap-3 group-hover:bg-transparent transition-all duration-500">
            <FileSpreadsheet size={18} className="text-[#D4AF37] group-hover:text-black transition-colors" />
            <span className="uppercase text-[10px] font-black tracking-[0.3em] text-[#D4AF37] group-hover:text-black transition-all duration-500">
              Exporter le Registre
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default HeaderOrders;