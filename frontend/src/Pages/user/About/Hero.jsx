import React from "react";
import { motion } from "framer-motion";
import heroImg from "../../../assets/img/restaurant-interior.jpg";

const Hero = () => {
  return (
    <section className="relative h-[65vh] w-full flex items-center justify-center overflow-hidden bg-[#050505]">
      
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{ backgroundImage: `url(${heroImg})` }}
        ></div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#050505]"></div>
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
      </motion.div>


      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col items-center gap-4 mb-6"
        >
          <span className="h-[1px] w-12 bg-[#D4AF37]"></span>
          <p className="text-[#D4AF37] text-xs md:text-sm font-black tracking-[0.6em] uppercase">
            Héritage d'Excellence
          </p>
          <span className="h-[1px] w-12 bg-[#D4AF37]"></span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="text-6xl md:text-8xl font-serif text-white leading-tight"
        >
          Notre <span className="italic font-light text-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">Histoire</span>
        </motion.h1>

        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "80px", opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="h-[1px] bg-[#D4AF37]/40 mx-auto mt-8 relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#D4AF37] rotate-45"></div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-[#050505] to-transparent"></div>
    </section>
  );
};

export default Hero;