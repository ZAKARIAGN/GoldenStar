import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import NavBarClient from '../Components/navbar&sidebar/NavBarClient';
import Footer from '../Components/Footer';
// Import d l-background
import bg from "../assets/img/Gemini_Generated_Image_yvxutpyvxutpyvxu.png";
const UserLayout = () => {
  const location = useLocation();

  return (

    <div className="relative min-h-screen bg-[#050505] selection:bg-[#D4AF37] selection:text-black font-['Plus_Jakarta_Sans',sans-serif]">
      

      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105"
          style={{ backgroundImage: `url(${bg})` }}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
      </div>


      <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>


      <header className="fixed top-0 left-0 w-full z-[80]">
        <NavBarClient />
      </header>
      <main className="relative z-10 pt-24 pb-12"> 
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="min-h-[80vh] px-4 md:px-8 max-w-[1600px] mx-auto">
              <Outlet />
            </div>
          </motion.div>
        </AnimatePresence>
      </main>


      <footer className="relative z-10 border-t border-[#D4AF37]/10 bg-black/90 backdrop-blur-xl">
        <Footer />
      </footer>
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none"></div>
    </div>
  );
};

export default UserLayout;