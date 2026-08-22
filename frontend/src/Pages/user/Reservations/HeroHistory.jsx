import React from "react";
import { motion } from "framer-motion";

// Khdemna b-nefs l-image bach n7afdo 3la l-vibe
const reservationBg =
  "../../../assets/img/Gemini_Generated_Image_51zmny51zmny51zm.png";

const HeroHistory = () => {
  return (
    <section className="relative h-[65vh] w-full flex items-center justify-center overflow-hidden bg-[#050505]">
      
      {/* Background Image with Cinematic Effects */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 grayscale-[20%]"
          style={{ backgroundImage: `url(${reservationBg})` }}
        ></div>

        {/* Dark Royal Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#050505]"></div>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>
      </motion.div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        
        {/* Top Header Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col items-center gap-4 mb-8"
        >
          <p className="text-[#D4AF37] text-[10px] md:text-xs font-black tracking-[0.6em] uppercase">
            Tableau de Bord Personnel
          </p>
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="text-6xl md:text-8xl font-serif text-white leading-tight mb-8"
        >
          Votre{" "}
          <span className="italic font-light text-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            Historique
          </span>
        </motion.h1>

        {/* Decorative Diamond Divider */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "120px", opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.1 }}
          className="h-[1px] bg-[#D4AF37]/30 relative mb-10"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#D4AF37] rotate-45 border border-black shadow-[0_0_8px_rgba(212,175,55,0.5)]"></div>
        </motion.div>

        {/* Balanced Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="text-gray-400 text-sm md:text-lg max-w-xl font-medium tracking-wide italic leading-relaxed"
        >
          Retrouvez les moments d'exception passés à nos côtés. Chaque
          réservation est une page de votre histoire chez{" "}
          <span className="text-[#D4AF37] font-bold not-italic">
            L'Étoile d'Or
          </span>
          .
        </motion.p>
      </div>

      {/* Smooth transition to the list below */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent"></div>
    </section>
  );
};

export default HeroHistory;