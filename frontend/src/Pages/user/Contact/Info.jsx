import React from "react";
import { MapPin, Phone, Mail, Clock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Info = () => {
  return (
    <div className="flex flex-col justify-center w-full md:w-1/2 text-sm gap-12 p-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-[#D4AF37]" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]/60">
            Informations
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-white">
          Coordonnées
        </h1>
        <p className="text-gray-500 font-light leading-relaxed max-w-sm">
          Notre équipe de conciergerie est à votre disposition pour sublimer
          votre expérience gastronomique.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <InfoCard
          icon={<MapPin size={18} />}
          title="Adresse Prestige"
          content="42 Avenue des Champs-Élysées, 75008 Paris"
        />

        <InfoCard
          icon={<Phone size={18} />}
          title="Ligne Directe"
          content="+33 1 42 56 78 90"
        />

        <InfoCard
          icon={<Mail size={18} />}
          title="Courrier Électronique"
          content="contact@letoiledor.fr"
        />
        <motion.div
          whileHover={{ x: 10 }}
          className="group border border-white/5 bg-white/[0.02] p-6 rounded-3xl transition-all duration-500 hover:border-[#D4AF37]/30"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
              <Clock size={18} />
            </div>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white group-hover:text-[#D4AF37] transition-colors">
              Horaires de Service
            </h2>
          </div>
          <div className="space-y-2 pl-14">
            <div className="flex justify-between text-gray-400 font-light">
              <span>Mardi - Samedi</span>
              <span className="text-[#D4AF37]">
                12:00 – 14:30 | 19:00 – 22:30
              </span>
            </div>
            <div className="flex justify-between text-gray-600 font-light italic">
              <span>Dimanche - Lundi</span>
              <span>Fermé</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Sub-component for clean code
const InfoCard = ({ icon, title, content }) => (
  <motion.div
    whileHover={{ x: 10 }}
    className="group border border-white/5 bg-white/[0.02] p-6 rounded-3xl transition-all duration-500 hover:border-[#D4AF37]/30 flex items-center gap-6"
  >
    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-500 shadow-xl">
      {icon}
    </div>
    <div className="space-y-1">
      <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37]/60">
        {title}
      </h2>
      <p className="text-white font-light text-base">{content}</p>
    </div>
  </motion.div>
);

export default Info;
