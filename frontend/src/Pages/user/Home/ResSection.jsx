import { Calendar, Clock, UserRound, ArrowRight, Sparkles } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: <Calendar className="text-[#D4AF37] size-7" strokeWidth={1.5} />,
    title: "Choisir la Date",
    desc: "Sélectionnez le jour idéal pour votre expérience gastronomique.",
    n: "I",
  },
  {
    icon: <Clock className="text-[#D4AF37] size-7" strokeWidth={1.5} />,
    title: "Choisir l'Heure",
    desc: "Déjeuner ou dîner, selon vos envies et votre emploi du temps.",
    n: "II",
  },
  {
    icon: <UserRound className="text-[#D4AF37] size-7" strokeWidth={1.5} />,
    title: "Nombre d'Invités",
    desc: "En couple ou en groupe, nous préparons votre table avec soin.",
    n: "III",
  },
];

const ResSection = () => {
  return (
    <section className="relative flex flex-col items-center py-32 px-6 bg-[#050505] overflow-hidden">
      {/* Background Decor - Luxury Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col items-center gap-6 mb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4"
        >
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37] block" />
          <p className="text-[#D4AF37] text-[11px] font-black tracking-[0.6em] uppercase flex items-center gap-2">
            <Sparkles size={12} className="animate-pulse" /> Privilège
          </p>
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37] block" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-serif text-5xl md:text-7xl text-white leading-tight"
        >
          Réserver Votre <br />
          <span className="italic font-light text-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            Instant Royal
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 max-w-lg text-sm md:text-base font-medium leading-relaxed opacity-80"
        >
          Une table d'exception vous attend. Suivez ces étapes pour garantir
          votre place au cœur de l'excellence.
        </motion.p>
      </div>

      {/* Cards - Luxury Glassmorphism */}
      <div className="relative z-10 flex flex-wrap justify-center gap-10 w-full max-w-6xl mb-24">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            className="group relative flex-1 min-w-[280px] max-w-[340px] flex flex-col items-center gap-8 bg-white/[0.02] border border-white/5 rounded-[3rem] py-16 px-10 text-center transition-all duration-700 hover:border-[#D4AF37]/40 hover:bg-white/[0.04] shadow-2xl"
          >
            {/* Roman Step Number */}
            <span className="absolute top-10 right-10 text-4xl font-serif italic font-black text-white/5 group-hover:text-[#D4AF37]/10 transition-colors duration-700">
              {step.n}
            </span>

            {/* Icon Container with Glow */}
            <div className="relative">
              <div className="absolute inset-0 bg-[#D4AF37]/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
              <div className="relative w-20 h-20 bg-[#0A0A0A] border border-white/10 rounded-3xl flex items-center justify-center group-hover:border-[#D4AF37]/50 group-hover:-translate-y-2 transition-all duration-700 shadow-inner">
                {step.icon}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-serif text-white group-hover:text-[#D4AF37] transition-colors duration-500">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium px-2 group-hover:text-gray-300 transition-colors duration-500">
                {step.desc}
              </p>
            </div>

            {/* Subtle bottom line */}
            <div className="w-10 h-[1px] bg-white/10 group-hover:w-full group-hover:bg-[#D4AF37]/30 transition-all duration-700" />
          </motion.div>
        ))}
      </div>

      {/* Final Call to Action */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex justify-center"
      >
        <Link
          to="/user/reservation"
          className="relative group inline-flex items-center justify-center px-16 py-6 overflow-hidden rounded-full transition-all duration-700 shadow-[0_0_30px_rgba(212,175,55,0.05)] hover:shadow-[0_0_60px_rgba(212,175,55,0.25)]"
        >
          {/* Animated Shimmer Border */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#8B6508] via-[#C25E0A] to-[#8B6508] animate-[shimmer_5s_infinite]" />

          {/* Inner Body - Inset de 1px pour un contour plus fin et élégant */}
          <div className="absolute inset-[1px] bg-black rounded-full group-hover:bg-transparent transition-all duration-500" />

          {/* Content Layer */}
          <span className="relative z-10 text-[#D4AF37] group-hover:text-black font-black text-[11px] tracking-[0.5em] uppercase flex items-center gap-4 transition-all duration-500">
            Réserver Maintenant
            <ArrowRight
              size={16}
              className="group-hover:translate-x-3 transition-transform duration-500 ease-in-out"
            />
          </span>

          {/* Interactive Highlight */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>
      </motion.div>
    </section>
  );
};

export default ResSection;
