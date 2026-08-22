import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../Context/ContextProvider";
import { getAllReservations, searchReservation, updateStatus } from "../../../Services/ReservationService";
import { toast } from "react-toastify";
import { Calendar, ChevronFirst, ChevronLast, Clock, Eye, Filter, Hash, Users, Search, Sparkles } from "lucide-react";

const ReservationTable = ({ view }) => {
  const { reservations, setReservations, refresh } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [reservationSearched, setReservationSearched] = useState([]);
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [tri, setTri] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Status Styles - L'Étoile d'Or Signature
  const statusStyles = {
    pending: "border-amber-500/30 text-amber-500 bg-amber-500/5",
    confirmed: "border-blue-500/30 text-blue-500 bg-blue-500/5",
    no_show: "border-gray-500/30 text-gray-500 bg-gray-500/5",
    completed: "border-[#D4AF37]/30 text-[#D4AF37] bg-[#D4AF37]/5",
    canceled: "border-red-500/30 text-red-500 bg-red-500/5",
  };

  useEffect(() => {
    const fetchReservation = async () => {
      setLoading(true);
      try {
        const data = await getAllReservations();
        setReservations(data || []);
      } catch {
        toast.error("Erreur de chargement du registre");
      } finally {
        setLoading(false);
      }
    };
    fetchReservation();
  }, [refresh, setReservations]);

  const dataSource = query.trim() === "" ? reservations || [] : reservationSearched || [];
  const filterReservations = dataSource.filter((res) => !filterStatus || res.status === filterStatus);

  const sortedReservations = [...filterReservations].sort((a, b) => {
    if (tri === "date-asc") return new Date(a.reservation_date) - new Date(b.reservation_date);
    if (tri === "date-desc") return new Date(b.reservation_date) - new Date(a.reservation_date);
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sortedReservations.length / itemsPerPage));
  const currentReservations = sortedReservations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (!value.trim()) { setReservationSearched([]); return; }
    try {
      const data = await searchReservation(value);
      setReservationSearched(data || []);
    } catch (err) { console.error(err); }
  };

  const handleChangeStatus = async (e, resID) => {
    const newStatus = e.target.value;
    try {
      const updated = await updateStatus(resID, newStatus);
      setReservations(prev => prev.map(o => o.id === resID ? updated : o));
      toast.success("État de la table mis à jour");
    } catch { toast.error("Action impossible"); }
  };

  return (
    <div className="w-full space-y-8">

      <div className="flex flex-col lg:flex-row justify-between gap-6 px-2">
        <div className="relative w-full lg:max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/30 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
          <input
            type="text"
            placeholder="Rechercher par convive ou référence..."
            value={query}
            onChange={handleSearch}
            className="w-full pl-12 pr-4 py-4 bg-[#0A0A0A] border border-white/5 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/30 transition-all font-light shadow-2xl"
          />
        </div>
        
        <div className="flex flex-row gap-4 w-full lg:w-auto">
          <select
            value={filterStatus}
            onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
            className="flex-1 lg:w-48 bg-[#0A0A0A] text-gray-400 border border-white/5 rounded-2xl px-4 py-4 outline-none text-[10px] font-black uppercase tracking-widest focus:border-[#D4AF37]/30 cursor-pointer"
          >
            <option value="" className="bg-black">Tous les statuts</option>
            {Object.keys(statusStyles).map(s => (
                <option key={s} value={s} className="bg-black">{s.replace('_', ' ')}</option>
            ))}
          </select>
          
          <select
            onChange={(e) => { setTri(e.target.value); setCurrentPage(1); }}
            className="flex-1 lg:w-48 bg-[#0A0A0A] text-gray-400 border border-white/5 rounded-2xl px-4 py-4 outline-none text-[10px] font-black uppercase tracking-widest focus:border-[#D4AF37]/30 cursor-pointer"
          >
            <option value="" className="bg-black">Trier l'agenda</option>
            <option value="date-desc" className="bg-black">Plus récent</option>
            <option value="date-asc" className="bg-black">Plus ancien</option>
          </select>
        </div>
      </div>

      <div className="bg-[#0A0A0A] rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/[0.02] text-[#D4AF37]/50 text-[9px] uppercase font-black tracking-[0.3em] border-b border-white/5">
                <th className="px-10 py-7">ID Client</th>
                <th className="px-10 py-7">Heure de Séance</th>
                <th className="px-10 py-7">Nom du Convive</th>
                <th className="px-10 py-7 text-center">Couverts</th>
                <th className="px-10 py-7 text-center">Statut</th>
                <th className="px-10 py-7 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {loading ? (
                <tr>
                    <td colSpan={6} className="py-32 text-center">
                        <div className="relative inline-block">
                            <div className="h-12 w-12 border-2 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin" />
                            <Sparkles className="absolute inset-0 m-auto text-[#D4AF37] animate-pulse" size={16} />
                        </div>
                    </td>
                </tr>
              ) : currentReservations.length === 0 ? (
                <NoDataRow />
              ) : (
                currentReservations.map((res) => (
                  <tr key={res.id} className="hover:bg-white/[0.01] transition-all group">
                    <td className="px-10 py-6">
                       <div className="flex items-center gap-2">
                          <Hash size={12} className="text-[#D4AF37]/40" />
                          <span className="font-serif text-sm text-white group-hover:text-[#D4AF37] transition-colors">#{res.reservation_ref}</span>
                       </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-white font-bold text-sm">
                            <Calendar size={14} className="text-[#D4AF37]/60" />
                            {new Date(res.reservation_date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long' })}
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-[10px] font-black tracking-tighter uppercase">
                            <Clock size={12} /> {res.reservation_time}
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <span className="text-white font-serif text-base tracking-tight italic font-light">
                        {res.user.f_name} {res.user.l_name}
                      </span>
                    </td>
                    <td className="px-10 py-6 text-center">
                      <span className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/5 px-4 py-2 rounded-xl text-[11px] font-black text-[#D4AF37] shadow-inner">
                        <Users size={12} /> {res.number_of_person}
                      </span>
                    </td>
                    <td className="px-10 py-6 text-center">
                      <select
                        value={res.status}
                        onChange={(e) => handleChangeStatus(e, res.id)}
                        className={`mx-auto px-5 py-2 rounded-full border text-[9px] font-black uppercase tracking-widest outline-none transition-all cursor-pointer ${statusStyles[res.status]}`}
                      >
                        <option value="pending" className="bg-black">EN ATTENTE</option>
                        <option value="confirmed" className="bg-black">CONFIRMÉ</option>
                        <option value="no_show" className="bg-black">NO SHOW</option>
                        <option value="completed" className="bg-black">TERMINÉ</option>
                        <option value="canceled" className="bg-black">ANNULÉ</option>
                      </select>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <button
                        onClick={() => view(res)}
                        className="p-3 bg-white/[0.03] border border-white/5 text-gray-500 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 rounded-2xl transition-all shadow-xl active:scale-95"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>


      <div className="flex justify-center items-center gap-4 py-8">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
          className="w-12 h-12 flex items-center justify-center bg-[#0A0A0A] border border-white/10 rounded-2xl text-[#D4AF37] disabled:opacity-20 hover:border-[#D4AF37]/50 transition-all shadow-2xl"
        >
          <ChevronFirst size={20} />
        </button>
        <div className="px-8 py-3 bg-[#0A0A0A] border border-white/5 rounded-full shadow-inner">
           <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">
             Page <span className="text-[#D4AF37]">{String(currentPage).padStart(2, '0')}</span> / {String(totalPages).padStart(2, '0')}
           </span>
        </div>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
          className="w-12 h-12 flex items-center justify-center bg-[#0A0A0A] border border-white/10 rounded-2xl text-[#D4AF37] disabled:opacity-20 hover:border-[#D4AF37]/50 transition-all shadow-2xl"
        >
          <ChevronLast size={20} />
        </button>
      </div>
    </div>
  );
};

const NoDataRow = () => (
  <tr>
    <td colSpan="6" className="py-40 text-center">
      <div className="flex flex-col items-center gap-6 opacity-30">
        <div className="w-20 h-20 bg-white/[0.02] border border-white/5 rounded-full flex items-center justify-center text-[#D4AF37]">
            <Calendar size={40} strokeWidth={1} />
        </div>
        <p className="text-xs font-black uppercase tracking-[0.5em] text-gray-500">L'agenda est vide</p>
      </div>
    </td>
  </tr>
);

export default ReservationTable;