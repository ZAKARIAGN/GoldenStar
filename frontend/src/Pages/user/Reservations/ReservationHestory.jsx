import React, { useState, useEffect } from 'react'
import HeroHistory from './HeroHistory'
import ReservationUserTable from './ReservationUserTable'
import ShowReservation from "../../admin/ReservationAdmin/ShowReservation"
import { motion, AnimatePresence } from "framer-motion"

const ReservationHistory = () => {
  const [showRes, setShowRes] = useState(false);
  const [selectedRes, setSelectedRes] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden">
      
      {/* Glow Effect in Background */}
      <div className="absolute top-[30%] left-[-10%] w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-[-5%] w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

      <HeroHistory />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="max-w-[1400px] mx-auto px-6 md:px-12 pb-32 relative z-10 -mt-20"
      >
        <div className="bg-white/[0.02] backdrop-blur-xl rounded-[3rem] border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.4)] overflow-hidden">
          <ReservationUserTable
            view={(reservation) => {
              setSelectedRes(reservation);
              setShowRes(true);
            }}
          />
        </div>
      </motion.div>

      {/* Modal / Show Reservation Overlay */}
      <AnimatePresence>
        {showRes && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRes(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="relative z-10 w-full max-w-2xl bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-[2.5rem] shadow-2xl overflow-hidden shadow-[#D4AF37]/5"
            >
              <ShowReservation
                reservation={selectedRes}
                onClose={() => setShowRes(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Elegant Footer Line */}
      <div className="py-16 text-center border-t border-white/5 bg-white/[0.01]">
         <p className="text-[10px] font-black tracking-[0.8em] uppercase text-gray-700">
           L'Étoile d'Or — Votre Collection Privée
         </p>
      </div>
    </div>
  )
}

export default ReservationHistory