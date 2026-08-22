import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-[#050505] pt-40 pb-20 text-center flex flex-col items-center gap-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[120px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex items-center gap-3"
      >
        <Sparkles size={14} className="text-[#D4AF37] opacity-60" />
        <p className="uppercase text-[10px] text-[#D4AF37] font-black tracking-[0.6em]">
          Conciergerie Royale
        </p>
        <Sparkles size={14} className="text-[#D4AF37] opacity-60" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-5xl md:text-8xl text-white font-serif leading-tight"
      >
        Restons en{" "}
        <span className="italic font-light text-[#D4AF37]">Contact</span>
      </motion.h1>

      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "120px", opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
      />
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        transition={{ duration: 1.5, delay: 0.6 }}
        className="max-w-md text-gray-400 text-xs uppercase tracking-[0.3em] font-light leading-relaxed"
      >
        Pour toute demande particulière ou réservation exclusive, notre équipe
        est à votre entière disposition.
      </motion.p>
    </section>
  );
};

export default Hero;
