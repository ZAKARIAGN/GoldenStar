import React from "react";
import img from "../../../assets/img/restaurant-interior.jpg"; // T-akked mn l-path
import { motion } from "framer-motion";
import { Star, Calendar, Sparkles, Quote } from "lucide-react";

export const Story = () => {
  return (
    <section className="relative bg-[#050505] py-24 md:py-32 px-6 md:px-20 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[120px] rounded-full -z-0 opacity-50" />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 md:gap-24 relative z-10">

        {/* Left - Image Side */}
        <div className="relative w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative z-10 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
          >
            <img
              src={img}
              alt="L'Étoile d'Or Interior"
              className="w-full h-[380px] md:h-[550px] object-cover hover:scale-110 transition-transform duration-[2s]"
            />
            {/* Overlay d-hbi khfif foq l-tesswira */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </motion.div>

          {/* Floating Royal Badge */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute -bottom-6 -right-2 md:-right-8 z-20 bg-[#0A0A0A] border border-[#D4AF37]/30 backdrop-blur-xl text-white px-8 py-6 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.8)] flex flex-col items-center min-w-[140px]"
          >
            <Calendar size={20} className="text-[#D4AF37] mb-2" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500 font-bold mb-1">Depuis</span>
            <span className="text-3xl font-serif font-black text-[#D4AF37]">2010</span>
          </motion.div>

          {/* Decorative Arabesque Pattern (Background) */}
          <div className="absolute -top-10 -left-10 w-40 h-40 border border-[#D4AF37]/10 rounded-full animate-pulse" />
        </div>

        {/* Right - Text Side */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <span className="h-[1px] w-10 bg-gradient-to-r from-[#D4AF37] to-transparent block" />
            <p className="text-[#D4AF37] text-[11px] font-black tracking-[0.5em] uppercase flex items-center gap-2">
              <Sparkles size={12} /> Notre Héritage
            </p>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl leading-[1.1] text-white"
          >
            L'Art de Recevoir avec 
            <br />
            <span className="italic font-light text-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              Excellence
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 text-base md:text-lg font-medium leading-relaxed max-w-xl border-l border-[#D4AF37]/20 pl-6"
          >
            Depuis plus d'une décennie, <span className="text-white font-bold">L'Étoile d'Or</span> s'impose comme le sanctuaire de la haute gastronomie à Casablanca. Nous fusionnons les traditions andalouses avec l'audace moderne pour créer des souvenirs impérissables.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="relative bg-white/[0.03] border border-white/5 p-8 rounded-3xl"
          >
            <Quote size={24} className="text-[#D4AF37] opacity-20 absolute top-4 left-4" />
            <p className="text-gray-300 text-sm md:text-base italic leading-relaxed relative z-10">
              "La cuisine est le miroir de l'âme, et chaque assiette que nous servons à L'Étoile d'Or est une promesse d'émotion pure."
            </p>
          </motion.div>

          {/* Stats Grid - Fully Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-white/10 pt-10">
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <p className="text-[#D4AF37] text-4xl font-serif font-black">15</p>
              <p className="text-gray-500 text-[10px] font-black tracking-[0.2em] uppercase mt-2">Années de Prestige</p>
            </div>
            
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left border-y sm:border-y-0 sm:border-x border-white/10 py-6 sm:py-0 sm:px-10">
              <div className="flex items-center gap-2">
                <p className="text-[#D4AF37] text-4xl font-serif font-black">2</p>
                <div className="flex">
                  <Star size={16} className="fill-[#D4AF37] text-[#D4AF37]" />
                  <Star size={16} className="fill-[#D4AF37] text-[#D4AF37]" />
                </div>
              </div>
              <p className="text-gray-500 text-[10px] font-black tracking-[0.2em] uppercase mt-2">Étoiles Michelin</p>
            </div>
            
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left sm:pl-10">
              <p className="text-[#D4AF37] text-4xl font-serif font-black">50k+</p>
              <p className="text-gray-500 text-[10px] font-black tracking-[0.2em] uppercase mt-2">Convives Comblés</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};