import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addReservation } from "../../../Services/ReservationService";
import ErrMsg from "../../../Components/ErrMsg";
import {
  Calendar,
  Clock,
  Phone,
  Users,
  MessageSquare,
  Sparkles,
} from "lucide-react";

const ReservationForm = () => {
  const [reservation, setReservation] = useState({
    client_phone: "",
    reservation_date: "",
    reservation_time: "",
    number_of_person: "",
    note: "",
  });

  const [err, setErr] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr({});
    try {
      await addReservation(reservation, setErr, navigate);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen flex justify-center items-center px-6 py-24 bg-[#050505] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-5xl bg-white/[0.02] backdrop-blur-3xl rounded-[3.5rem] p-8 md:p-20 border border-white/5 shadow-2xl relative z-10">
        <div className="flex flex-col items-center text-center mb-20">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles size={14} className="text-[#D4AF37]" />
            <span className="text-[#D4AF37] text-[10px] font-black tracking-[0.6em] uppercase">
              Table d'Exception
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-white">
            Détails de votre{" "}
            <span className="italic font-light text-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              Visite
            </span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-16">
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] font-black">
                <Calendar size={14} /> Date Prévue
              </label>
              <input
                type="date"
                name="reservation_date"
                value={reservation.reservation_date}
                onChange={handleChange}
                className="bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 text-white focus:border-[#D4AF37]/50 focus:bg-white/[0.05] outline-none transition-all font-medium appearance-none"
              />
              <ErrMsg msg={err.reservation_date?.[0]} />
            </div>

            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] font-black">
                <Clock size={14} /> Heure de Table
              </label>
              <input
                type="time"
                name="reservation_time"
                value={reservation.reservation_time}
                onChange={handleChange}
                className="bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 text-white focus:border-[#D4AF37]/50 focus:bg-white/[0.05] outline-none transition-all font-medium appearance-none"
              />
              <ErrMsg msg={err.reservation_time?.[0]} />
            </div>

            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] font-black">
                <Phone size={14} /> Contact Direct
              </label>
              <input
                type="tel"
                name="client_phone"
                value={reservation.client_phone}
                onChange={handleChange}
                placeholder="06 -- -- -- --"
                className="bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 text-white focus:border-[#D4AF37]/50 focus:bg-white/[0.05] outline-none transition-all font-medium placeholder:text-gray-600"
              />
              <ErrMsg msg={err.client_phone?.[0]} />
            </div>

            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] font-black">
                <Users size={14} /> Nombre de Convives
              </label>
              <input
                type="number"
                name="number_of_person"
                value={reservation.number_of_person}
                onChange={handleChange}
                placeholder="2"
                className="bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 text-white focus:border-[#D4AF37]/50 focus:bg-white/[0.05] outline-none transition-all font-medium placeholder:text-gray-600"
              />
              <ErrMsg msg={err.number_of_person?.[0]} />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] font-black">
              <MessageSquare size={14} /> Notes Particulières
            </label>
            <textarea
              name="note"
              rows="3"
              value={reservation.note}
              onChange={handleChange}
              placeholder="Allergies, anniversaire, ou préférence de table..."
              className="bg-white/[0.03] border border-white/10 rounded-[2rem] px-8 py-6 text-white focus:border-[#D4AF37]/50 focus:bg-white/[0.05] outline-none transition-all font-medium resize-none placeholder:text-gray-600"
            />
            <ErrMsg msg={err.note?.[0]} />
          </div>

          <div className="flex justify-center pt-16">
            <button
              type="submit"
              disabled={loading}
              className="relative group overflow-hidden p-[1px] rounded-full transition-all duration-700 active:scale-95 disabled:opacity-70 shadow-[0_0_30px_rgba(212,175,55,0.05)] hover:shadow-[0_0_50px_rgba(212,175,55,0.2)]"
            >
              {/* Border Layer (Shimmer) */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-[#8B6508] via-[#C25E0A] to-[#8B6508] ${loading ? "animate-[shimmer_1.5s_infinite]" : "animate-[shimmer_4s_infinite]"}`}
              />

              {/* Inner Body - Inset 1px exactly */}
              <div className="relative bg-black rounded-full transition-all duration-500 group-hover:bg-transparent py-5 px-16 flex items-center justify-center min-w-[300px]">
                <span className="relative z-10 uppercase text-[10px] font-black tracking-[0.5em] text-[#D4AF37] group-hover:text-black transition-all duration-500">
                  {loading ? (
                    <span className="animate-pulse italic">
                      Traitement Royal...
                    </span>
                  ) : (
                    "Confirmer la Réservation"
                  )}
                </span>
              </div>
            </button>
          </div>
        </form>

        <div className="mt-20 pt-10 border-t border-white/5 flex justify-center">
          <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.6em]">
            Palais Royal — Excellence Gastronomique
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReservationForm;
