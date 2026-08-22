import React, { useEffect } from "react";
import Hero from "./Hero";
import AllDishes from "./AllDishes";
import { motion } from "framer-motion";

const Menu = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-[#050505]"
    >
      <Hero />

      <div className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-[#D4AF37]/30 to-transparent z-20"></div>
        
        <AllDishes />
      </div>

      <section className="py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[#D4AF37]/5 blur-[100px] rounded-full translate-y-1/2"></div>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 text-[10px] font-black tracking-[0.8em] uppercase text-[#D4AF37]/30"
        >
          L'art de la table, redéfini par l'excellence.
        </motion.p>
      </section>
    </motion.main>
  );
};

export default Menu;