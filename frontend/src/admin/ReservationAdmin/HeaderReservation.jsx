import React from 'react';
import { CalendarCheck, ChevronRight, Sparkles, Clock } from 'lucide-react';

const HeaderReservation = () => {
  return (
    <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8 pb-10 mb-12 border-b border-white/5 animate-in fade-in slide-in-from-top-6 duration-1000 relative'>
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#D4AF37]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className='flex flex-col gap-5 relative z-10'>
        <div className='flex items-center gap-3 text-[#D4AF37]/60'>
          <span className='text-[10px] uppercase tracking-[0.6em] font-black'>Art de la Table & Planning</span>
          <ChevronRight size={14} className="opacity-50" />
          <Sparkles size={12} className="animate-pulse" />
        </div>
        
        <div className='flex items-start gap-6 md:gap-8'>
          <div className='relative group'>
            <div className="absolute -inset-1 bg-[#D4AF37]/20 blur-lg rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className='relative bg-[#0A0A0A] border border-[#D4AF37]/30 p-4 md:p-5 rounded-[1.5rem] shadow-2xl text-[#D4AF37]'>
              <CalendarCheck size={38} strokeWidth={1.5} />
            </div>
          </div>

          <div className="space-y-3">
            <h1 
              className='text-4xl md:text-6xl text-white font-serif tracking-tight leading-tight'
            >
              Maîtrise des <span className='text-[#D4AF37] italic font-light'>Réservations</span>
            </h1>
            <div className="flex items-center gap-4">
               <div className="h-[1px] w-12 bg-[#D4AF37]/40" />
               <p className="text-gray-500 text-xs md:text-sm uppercase tracking-[0.2em] font-light max-w-lg leading-relaxed">
                 Orchestrez l'accueil de vos convives et la disposition des tables avec élégance et précision.
               </p>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex flex-col items-end gap-3 relative z-10">
        <div className="bg-[#0A0A0A] border border-white/5 p-5 rounded-[2rem] shadow-2xl flex items-center gap-5 backdrop-blur-xl group hover:border-[#D4AF37]/20 transition-all duration-500">
          <div className="bg-[#D4AF37]/5 p-3 rounded-xl">
             <Clock size={18} className="text-[#D4AF37]" />
          </div>
          <div className="text-right">
            <p className="text-[9px] font-black text-[#D4AF37]/50 uppercase tracking-[0.3em] mb-1">État du Service</p>
            <p className="text-xs font-bold text-white tracking-wide">Établissement Ouvert</p>
          </div>
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-20"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]"></span>
          </div>
        </div>
        <p className="text-[10px] text-gray-600 font-medium px-4 tracking-tight">Mise à jour automatique en temps réel</p>
      </div>
    </div>
  );
}

export default HeaderReservation;