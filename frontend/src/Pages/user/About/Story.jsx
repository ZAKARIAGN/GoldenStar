import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
// T-akked men smit l-image u l-path 3ndek f l-assets
import storyImg from "../../../assets/img/restaurant-interior.jpg"; 

export const Story = () => {
  return (
    <section className="bg-[#050505] text-white py-32 overflow-hidden relative">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
        

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative"
        >

          <div className="relative z-10 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
            <img
              src={storyImg}
              alt="Restaurant Interior"
              className="w-full h-[600px] object-cover transition-transform duration-[3s] hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>


          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute -bottom-8 -right-8 z-20 bg-[#0A0A0A] border border-[#D4AF37]/30 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center min-w-[160px]"
          >
            <span className="block text-[#D4AF37] text-[10px] font-black tracking-[0.3em] uppercase mb-1">Depuis</span>
            <span className="text-3xl font-serif text-white block">2010</span>
            <div className="w-8 h-[1px] bg-[#D4AF37] mx-auto mt-3"></div>
          </motion.div>


          <div className="absolute -top-6 -left-6 w-full h-full border border-[#D4AF37]/20 rounded-[2rem] -z-10 hidden md:block" />
        </motion.div>


        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col gap-8"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Sparkles size={16} className="text-[#D4AF37]" />
              <span className="text-[#D4AF37] text-[10px] font-black tracking-[0.5em] uppercase">Héritage & Vision</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif leading-tight">
              Une Passion Née en <span className="italic font-light text-[#D4AF37]">2010</span>
            </h2>
          </div>

          <div className="space-y-6 text-gray-400 font-medium leading-relaxed text-lg">
            <p className="border-l-2 border-[#D4AF37]/30 pl-6 italic">
              "L'Étoile d'Or est née de la vision de notre chef fondateur, Pierre Duval. Après des années passées dans les plus prestigieux établissements parisiens, il a imaginé un lieu où la haute tradition rencontre l'audace moderne."
            </p>

            <p>
              Notre établissement célèbre l'essence même de la gastronomie française : des ingrédients d'exception, des techniques maîtrisées à la perfection et une créativité sans cesse renouvelée.
            </p>

            <p>
              Aujourd'hui, notre équipe passionnée perpétue cette philosophie, offrant à chaque convive non pas un simple repas, mais une partition culinaire mémorable.
            </p>
          </div>

          <motion.div 
            whileHover={{ x: 10 }}
            className="pt-4"
          >
            <div className="h-[1px] w-24 bg-[#D4AF37] mb-4"></div>
            <p className="text-[#D4AF37] text-[10px] font-black tracking-[0.4em] uppercase">Signature de l'Excellence</p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};