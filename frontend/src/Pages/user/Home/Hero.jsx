import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight, Sparkles } from "lucide-react";
import bg from "../../../assets/img/Gemini_Generated_Image_yvxutpyvxutpyvxu.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#050505]">
      {/* Background Image with Parallax-like feel */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bg})` }}
        />
        {/* Gradients bach n-blendiw l-image m3a l-content */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
      </div>

      {/* Floating Gold Ornaments (Vibe andaloussia) */}
      <div className="absolute top-1/4 right-10 w-64 h-64 border border-[#D4AF37]/5 rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 w-96 h-96 border border-[#D4AF37]/5 rounded-full animate-[ping_10s_infinite] pointer-events-none opacity-20" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1400px] px-8 md:px-20 pt-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="h-[1px] w-12 bg-gradient-to-r from-[#D4AF37] to-transparent" />
          <div className="flex items-center gap-2">
            <Sparkles size={12} className="text-[#D4AF37] animate-pulse" />
            <p className="text-[#D4AF37] text-[10px] md:text-[11px] font-black tracking-[0.5em] uppercase">
              L'Héritage de la Gastronomie Royale
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          <h1 className="font-serif text-[60px] md:text-[120px] leading-[0.85] text-white mb-8">
            L'Étoile
            <br />
            <span className="italic font-light text-[#D4AF37] drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              d'Or
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="text-gray-400 text-sm md:text-lg max-w-[450px] font-medium leading-relaxed mb-12 border-l-2 border-[#D4AF37]/20 pl-6"
        >
          Bienvenue dans un sanctuaire de saveurs où chaque détail est une œuvre
          d'art. Goûtez à l'excellence andalouse revisitée avec passion.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex flex-wrap items-center gap-6"
        >
          {/* Primary Button: Royal Gold (Thin Border) */}
          <Link
            to="/user/reservation"
            className="relative group px-10 py-5 rounded-full transition-all duration-500 flex items-center justify-center overflow-hidden"
          >
            {/* Animated Border using a pseudo-element */}
            <div className="absolute inset-0 rounded-full border border-[#D4AF37] group-hover:bg-[#D4AF37] transition-all duration-500 shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:shadow-[#D4AF37]/50" />

            <span className="relative z-10 text-[#D4AF37] group-hover:text-black font-black text-[10px] tracking-[0.3em] uppercase flex items-center gap-3 transition-colors duration-500">
              Réserver l'Expérience
              <ArrowRight
                size={14}
                className="group-hover:translate-x-2 transition-transform duration-500"
              />
            </span>
          </Link>

          {/* Secondary Button: Outline Gold */}
          <Link
            to="/user/menu"
            className="group px-10 py-5 rounded-full border border-[#D4AF37]/30 text-white font-black text-[10px] tracking-[0.3em] uppercase hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] transition-all duration-500 active:scale-95 flex items-center justify-center"
          >
            Explorer le menu
          </Link>
        </motion.div>
      </div>

      {/* Refined Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#D4AF37] to-transparent" />
        <span className="text-[#D4AF37] text-[8px] font-black tracking-[0.5em] uppercase opacity-60">
          Découvrir
        </span>
      </motion.div>

      {/* Side Decorative Text */}
      <div className="absolute right-10 top-1/2 -rotate-90 origin-right text-[#D4AF37]/10 text-[60px] font-serif font-black uppercase pointer-events-none hidden lg:block">
        Tradition & Luxe
      </div>
    </section>
  );
};

export default Hero;
