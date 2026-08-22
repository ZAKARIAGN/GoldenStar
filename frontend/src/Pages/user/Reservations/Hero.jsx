import React from "react";
import { motion } from "framer-motion";
// 1. Darori t-importi l-image b smit-ha bach Webpack/Vite ya3tiwha l-path l-m9add
import reservationBg from "../../../assets/img/Gemini_Generated_Image_51zmny51zmny51zm.png";

const Hero = () => {
  return (
    <section className="relative h-[75vh] w-full flex items-center justify-center overflow-hidden bg-[#050505]">
      
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          // 2. Kheddem smit l-import hna
          style={{ backgroundImage: `url(${reservationBg})` }}
        ></div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-[#050505]"></div>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
      </motion.div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col items-center gap-5 mb-8"
        >
          <p className="text-[#D4AF37] text-[10px] md:text-xs font-black tracking-[0.8em] uppercase">
            Expérience Exclusive
          </p>
          <div className="h-12 w-[1px] bg-gradient-to-b from-[#D4AF37] to-transparent"></div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="text-6xl md:text-9xl font-serif text-white leading-tight mb-10"
        >
          Réserver votre <span className="italic font-light text-[#D4AF37] drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]">Table</span>
        </motion.h1>

        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "160px", opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.1 }}
          className="h-[1px] bg-[#D4AF37]/30 relative mb-12"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#D4AF37] rotate-45 border border-black shadow-[0_0_10px_#D4AF37]"></div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="text-gray-300 text-sm md:text-xl max-w-2xl font-medium tracking-wide leading-relaxed opacity-80"
        >
          Joignez-vous à nous pour une soirée inoubliable. 
          L'art de recevoir commence par une attention particulière et une quête de perfection.
        </motion.p>

      </div>

      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent"></div>
    </section>
  );
};

export default Hero;