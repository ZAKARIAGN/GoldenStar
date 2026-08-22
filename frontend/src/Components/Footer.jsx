import React from "react";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaLocationDot, FaPhone, FaEnvelope, FaClock } from "react-icons/fa6";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] text-gray-500 px-8 md:px-20 pt-24 pb-12 overflow-hidden relative border-t border-[#D4AF37]/10">
      <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none select-none">
        <h2 className="text-[18rem] font-serif italic leading-none -translate-y-1/4 translate-x-1/4 text-[#D4AF37]">
          Or
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
        <div className="space-y-8">
          <h2 className="text-3xl font-serif text-white">
            L'Étoile <span className="text-[#D4AF37] italic font-light drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">d'Or</span>
          </h2>
          <p className="text-sm leading-7 text-gray-400 font-medium">
            Une escale gastronomique où l'élégance rencontre le goût. Nous créons des souvenirs à travers une cuisine d'exception depuis 2010.
          </p>
          <div className="flex gap-4">
            {[FaInstagram, FaFacebookF, FaLinkedinIn].map((Icon, idx) => (
              <motion.a
                key={idx}
                whileHover={{ y: -5, borderColor: "#D4AF37", color: "#D4AF37" }}
                className="w-11 h-11 border border-white/10 flex items-center justify-center rounded-full transition-all cursor-pointer text-gray-500 bg-white/[0.02]"
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[#D4AF37] font-black text-[10px] tracking-[0.4em] uppercase mb-10">Navigation</h3>
          <ul className="space-y-5 text-sm font-medium">
            {["Accueil", "Notre Menu", "À Propos", "Réservation", "Contact"].map((item, idx) => (
              <li key={idx}>
                <a className="hover:text-white transition-colors cursor-pointer flex items-center group">
                  <span className="w-0 group-hover:w-6 h-[1px] bg-[#D4AF37] transition-all duration-500 mr-0 group-hover:mr-3"></span>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[#D4AF37] font-black text-[10px] tracking-[0.4em] uppercase mb-10">Contact</h3>
          <div className="space-y-7 text-sm">
            <div className="flex items-start gap-5">
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center shrink-0">
                <FaLocationDot className="text-[#D4AF37]" size={14} />
              </div>
              <p className="font-medium leading-relaxed text-gray-400">
                42 Avenue des <br /> Champs-Élysées, Paris
              </p>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center shrink-0">
                <FaPhone className="text-[#D4AF37]" size={14} />
              </div>
              <p className="font-medium text-gray-400">+33 1 42 56 78 90</p>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center shrink-0">
                <FaEnvelope className="text-[#D4AF37]" size={14} />
              </div>
              <p className="font-medium text-gray-400">contact@letoiledor.fr</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-[#D4AF37] font-black text-[10px] tracking-[0.4em] uppercase mb-10">Horaires</h3>
          <div className="space-y-5">
            <div className="bg-white/[0.02] p-7 rounded-[2rem] border border-white/5 backdrop-blur-sm shadow-2xl">
              <div className="flex items-center gap-3 mb-4 text-[#D4AF37]">
                <FaClock size={14} />
                <span className="text-[10px] font-black tracking-[0.2em] uppercase">Mardi - Samedi</span>
              </div>
              <div className="text-base space-y-2 font-serif text-white">
                <p>12:00 — 14:30</p>
                <p>19:00 — 22:30</p>
              </div>
            </div>
            <p className="text-[9px] text-gray-600 font-black tracking-[0.3em] uppercase px-4">
              Dimanche - Lundi : <span className="text-rose-900/80">Fermé</span>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-black tracking-[0.3em] uppercase text-gray-600">
        <p>© {currentYear} L'Étoile d'Or. Conçu pour l'excellence.</p>
        <div className="flex gap-10">
          <a className="hover:text-[#D4AF37] transition-colors cursor-pointer">Mentions Légales</a>
          <a className="hover:text-[#D4AF37] transition-colors cursor-pointer">Confidentialité</a>
        </div>
      </div>
    </footer>
  );
}