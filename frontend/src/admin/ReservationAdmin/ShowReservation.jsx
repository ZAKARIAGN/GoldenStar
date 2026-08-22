import React from "react";
import { X, User, Phone, Calendar, Users, FileText, Mail, Clock, ShieldCheck, Sparkles, Hash } from "lucide-react";

const ShowReservation = ({ reservation, onClose }) => {
  if (!reservation) return null;

  const statusColors = {
    pending: "text-amber-500 bg-amber-500/5 border-amber-500/20",
    confirmed: "text-blue-500 bg-blue-500/5 border-blue-500/20",
    no_show: "text-gray-500 bg-gray-500/5 border-gray-500/20",
    completed: "text-[#D4AF37] bg-[#D4AF37]/5 border-[#D4AF37]/20",
    canceled: "text-red-500 bg-red-500/5 border-red-500/20",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/95 backdrop-blur-xl z-[120] p-2 md:p-4 animate-in fade-in duration-300">
      

      <div className="bg-[#0A0A0A] w-full max-w-2xl rounded-[3.5rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-500 border border-white/5 relative">
        

        <div className="absolute top-0 left-0 w-40 h-40 bg-[#D4AF37]/10 blur-[80px] rounded-full -z-10" />


        <div className="flex justify-between items-center p-8 md:p-10 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-5">
            <div className="bg-gradient-to-br from-[#8B6508] to-[#D4AF37] p-4 rounded-2xl shadow-xl text-black">
               <ShieldCheck size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-serif text-white tracking-tight">
                Fiche de <span className="text-[#D4AF37] italic font-light">Séance</span>
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Hash size={12} className="text-[#D4AF37]/50" />
                <p className="text-[10px] text-gray-500 font-black tracking-[0.3em] uppercase">
                  RÉSERV: {reservation.reservation_ref}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 rounded-2xl bg-white/5 text-gray-500 hover:text-[#D4AF37] hover:bg-white/10 transition-all border border-white/5"
          >
            <X size={22} />
          </button>
        </div>


        <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            

            <div className="space-y-6">
              <div className="flex items-center gap-3 px-1">
                <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse"></div>
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 font-sans">Le Convive</h2>
              </div>
              
              <div className="flex flex-col gap-4">
                <InfoCard icon={<User />} label="Nom du Titulaire" value={`${reservation.user.f_name} ${reservation.user.l_name}`} isSerif />
                <InfoCard icon={<Phone />} label="Ligne de Contact" value={reservation.client_phone} />
                <InfoCard icon={<Mail />} label="Courriel Électronique" value={reservation.user.email} />
              </div>
            </div>

            <div className="space-y-6">
               <div className="flex items-center gap-3 px-1">
                <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse"></div>
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 font-sans">Détails Séance</h2>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <InfoCard icon={<Calendar />} label="Date Prévue" value={new Date(reservation.reservation_date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })} />
                  <InfoCard icon={<Clock />} label="Heure d'arrivée" value={reservation.reservation_time} />
                </div>
                <InfoCard icon={<Users />} label="Nombre de Couverts" value={`${reservation.number_of_person} Personnes`} />
                <div className={`p-4 rounded-2xl border text-center font-black text-[10px] uppercase tracking-[0.2em] shadow-inner ${statusColors[reservation.status?.toLowerCase()] || statusColors.pending}`}>
                  Statut Actuel: {reservation.status}
                </div>
              </div>
            </div>


            {reservation.note && (
              <div className="md:col-span-2">
                <div className="p-8 bg-white/[0.02] rounded-[2.5rem] border border-white/5 relative group overflow-hidden">
                  <Sparkles className="absolute right-6 top-6 text-[#D4AF37]/10 group-hover:rotate-12 transition-transform duration-700" size={40} />
                  <p className="text-[10px] font-black uppercase text-[#D4AF37] mb-4 tracking-[0.3em]">Exigences Particulières</p>
                  <p className="text-base text-gray-400 italic leading-relaxed relative z-10 font-serif">
                    "{reservation.note}"
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>


        <div className="p-8 md:p-10 bg-white/[0.02] border-t border-white/5 flex justify-center">
          <button 
            onClick={onClose}
            className="w-full md:w-auto px-16 py-4 bg-[#D4AF37] text-black rounded-full font-black uppercase text-[11px] tracking-[0.3em] hover:bg-white transition-all shadow-[0_10px_30px_rgba(212,175,55,0.2)] active:scale-95"
          >
            Fermer le Registre
          </button>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, label, value, isSerif }) => (
  <div className="flex items-center gap-5 p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group">
    <div className="p-3 rounded-xl bg-white/5 text-[#D4AF37] group-hover:scale-110 transition-transform duration-500">
      {React.cloneElement(icon, { size: 20, strokeWidth: 1.5 })}
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-[9px] uppercase font-black text-gray-600 mb-1 tracking-widest">{label}</p>
      <p className={`text-sm font-bold text-gray-200 truncate ${isSerif ? 'font-serif text-base' : 'font-sans'}`}>
        {value || "N/A"}
      </p>
    </div>
  </div>
);

export default ShowReservation;