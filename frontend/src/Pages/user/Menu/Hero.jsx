import React from "react";
import { motion } from "framer-motion";

const heroBg = "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=2080&auto=format&fit=crop";

const Hero = () => {
  return (
    <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden bg-[#050505]">
      
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        ></div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/60"></div>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
      </motion.div>

      <div className="relative z-10 w-full max-w-[1400px] px-6 md:px-12 flex flex-col items-start text-left">
        
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center gap-5 mb-8"
        >
          <span className="h-[1px] w-16 bg-gradient-to-r from-[#D4AF37] to-transparent block"></span>
          <p className="text-[#D4AF37] text-[10px] md:text-[11px] font-black tracking-[0.6em] uppercase">
            Immersion Gastronomique
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="text-7xl md:text-[140px] font-serif leading-[0.85] text-white mb-10"
        >
          Le <span className="italic font-light text-[#D4AF37] drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]">Menu</span>
        </motion.h1>

        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "120px", opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="h-[1px] bg-[#D4AF37]/30 relative mb-10"
        >
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 bg-[#D4AF37] rotate-45 shadow-[0_0_10px_#D4AF37]"></div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-gray-300 text-lg md:text-2xl max-w-2xl font-medium leading-relaxed"
        >
          L'excellence s'invite à votre table. Explorez une partition culinaire où la tradition rencontre 
          <span className="text-white italic"> l'avant-garde</span>, sublimée par des produits d'exception.
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[#D4AF37] text-[9px] tracking-[0.3em] uppercase font-bold">Découvrir</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#D4AF37] to-transparent"></div>
      </motion.div>
      
    </section>
  );
};

export default Hero;