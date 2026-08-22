import React, { useState } from "react";
import HeaderReservation from "./HeaderReservation";
import ReservationTable from "./ReservationTable";
import ShowReservation from "./ShowReservation";

const Reservations = () => {
  const [showRes, setShowRes] = useState(false);
  const [selectedRes, setSelectedRes] = useState(null);

  const handleViewReservation = (reservation) => {
    setSelectedRes(reservation);
    setShowRes(true);
  };

  return (
    <div className="min-h-full relative animate-in fade-in slide-in-from-bottom-6 duration-1000">
      
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="relative z-10">

        <HeaderReservation />

        <div className="mt-4">
          <ReservationTable view={handleViewReservation} />
        </div>
      </div>
      {showRes && selectedRes && (
        <ShowReservation
          reservation={selectedRes}
          onClose={() => setShowRes(false)}
        />
      )}
      <div className="mt-24 pb-12 flex flex-col items-center gap-4 opacity-30">
        <div className="flex items-center gap-6">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <span className="text-[10px] uppercase tracking-[0.6em] text-[#D4AF37] font-black">
            L'Étoile d'Or
          </span>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>
        <p className="text-[9px] text-gray-600 uppercase tracking-widest font-medium">
          Système de Conciergerie & Réservations
        </p>
      </div>
    </div>
  );
};

export default Reservations;