import React, { useEffect } from "react";
import Hero from "./Hero";
import ReservationForm from "./ReservationForm";
import { motion } from "framer-motion";

const Reservation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-[#050505] min-h-screen"
    >
      <Hero />
      
      <div className="relative -mt-32 z-20 pb-20">
        <ReservationForm />
      </div>

      <footer className="py-24 flex flex-col items-center justify-center gap-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#D4AF37]/5 blur-[80px] rounded-full translate-y-1/2" />
        <div className="w-[1px] h-20 bg-gradient-to-b from-[#D4AF37]/40 to-transparent relative z-10"></div>
        <p className="relative z-10 text-[10px] font-black tracking-[0.8em] uppercase text-[#D4AF37]/20">
          L'Étoile d'Or — L'Excellence à votre table
        </p>
      </footer>
    </motion.main>
  );
};

export default Reservation;