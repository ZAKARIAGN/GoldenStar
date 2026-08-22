import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../Context/ContextProvider";
import { getReservationsByUser, searchReservation } from "../../../Services/ReservationService";
import { toast } from "react-toastify";
import {
  Calendar,
  ChevronFirst,
  ChevronLast,
  Clock,
  Eye,
  Filter,
  Search,
  Sparkles,
} from "lucide-react";

const ReservationUserTable = ({ view }) => {
  const { reservations, setReservations, refresh } = useContext(Context);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reservationSearched, setReservationSearched] = useState([]);
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [tri, setTri] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Status Styles adjusted for the Dark/Gold theme
  const statusStyles = {
    pending: "border-[#D4AF37]/30 text-[#D4AF37] bg-[#D4AF37]/5",
    confirmed: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
    no_show: "border-gray-500/30 text-gray-400 bg-gray-500/5",
    completed: "border-blue-500/30 text-blue-400 bg-blue-500/5",
    canceled: "border-red-500/30 text-red-400 bg-red-500/5",
  };

  useEffect(() => {
    const fetchReservation = async () => {
      setLoading(true);
      try {
        const data = await getReservationsByUser(setErr);
        setReservations(data);
      } catch {
        toast.error(err || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchReservation();
  }, [refresh, setReservations]);

  const dataSource = query.trim() === "" ? reservations || [] : reservationSearched || [];

  const filteredAndSorted = [...dataSource]
    .filter((res) => !filterStatus || res.status === filterStatus)
    .sort((a, b) => {
      if (tri === "date-asc") return new Date(a.reservation_date) - new Date(b.reservation_date);
      if (tri === "date-desc") return new Date(b.reservation_date) - new Date(a.reservation_date);
      return 0;
    });

  const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);
  const currentReservations = filteredAndSorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (!value.trim()) {
      setReservationSearched([]);
      return;
    }
    try {
      const data = await searchReservation(value, setErr);
      setReservationSearched(data || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full space-y-10 px-4 pb-20">
      {/* Filters Header - Glassmorphism Style */}
      <div className="bg-white/[0.02] backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="relative w-full lg:w-1/3 group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#D4AF37]/50 group-focus-within:text-[#D4AF37] transition-colors">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Rechercher une référence..."
              value={query}
              onChange={handleSearch}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white focus:border-[#D4AF37]/50 focus:bg-white/[0.05] outline-none transition-all placeholder:text-gray-600"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-5 w-full lg:w-1/2">
            <select
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
              className="w-full bg-white/[0.03] text-gray-400 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#D4AF37]/50 transition-all cursor-pointer font-medium appearance-none"
            >
              <option value="" className="bg-[#050505]">Tous les statuts</option>
              {Object.keys(statusStyles).map(s => (
                <option key={s} value={s} className="bg-[#050505]">{s.replace('_', ' ').toUpperCase()}</option>
              ))}
            </select>

            <select
              onChange={(e) => { setTri(e.target.value); setCurrentPage(1); }}
              value={tri}
              className="w-full bg-white/[0.03] text-gray-400 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#D4AF37]/50 transition-all cursor-pointer font-medium appearance-none"
            >
              <option value="" className="bg-[#050505]">Trier par</option>
              <option value="date-desc" className="bg-[#050505]">Plus récent</option>
              <option value="date-asc" className="bg-[#050505]">Plus ancien</option>
            </select>
          </div>
        </div>
      </div>

      {/* Desktop Table - Museum List Style */}
      <div className="hidden md:block overflow-hidden rounded-[2.5rem] bg-white/[0.02] border border-white/5 shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.01]">
              <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]/60">Référence</th>
              <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]/60">Convive</th>
              <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]/60">Date & Heure</th>
              <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]/60 text-center">Pers.</th>
              <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]/60 text-center">Statut</th>
              <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]/60 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr><td colSpan={6} className="py-32 text-center"><div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-[#D4AF37]"></div></td></tr>
            ) : currentReservations.length === 0 ? (
              <NoDataRow />
            ) : (
              currentReservations.map((res) => (
                <tr key={res.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-10 py-8">
                    <span className="font-mono text-xs font-bold text-gray-500 group-hover:text-[#D4AF37] transition-colors">#{res.reservation_ref}</span>
                  </td>
                  <td className="px-10 py-8">
                    <div className="text-white font-serif text-base">{res.user.f_name} {res.user.l_name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Sparkles size={10} className="text-[#D4AF37]" />
                      <div className="text-[9px] text-[#D4AF37]/50 font-black uppercase tracking-widest">Client Distingué</div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-3 text-gray-300 text-sm font-medium">
                      <Calendar size={14} className="text-[#D4AF37]/40" /> {new Date(res.reservation_date).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1.5">
                      <Clock size={14} className="text-[#D4AF37]/40" /> {res.reservation_time}
                    </div>
                  </td>
                  <td className="px-10 py-8 text-center font-serif text-lg text-white/80">{res.number_of_person}</td>
                  <td className="px-10 py-8">
                    <div className={`mx-auto w-fit px-5 py-2 rounded-full border text-[9px] font-black uppercase tracking-[0.2em] shadow-lg backdrop-blur-md ${statusStyles[res.status]}`}>
                      {res.status.replace('_', ' ')}
                    </div>
                  </td>
                  <td className="px-10 py-8 text-center">
                    <button 
                      onClick={() => view(res)} 
                      className="group/btn inline-flex items-center justify-center w-12 h-12 bg-white/5 hover:bg-[#D4AF37] rounded-2xl transition-all duration-500 text-[#D4AF37] hover:text-black shadow-xl"
                    >
                      <Eye size={20} className="transition-transform group-hover/btn:scale-110" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination - Classy Dark Design */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-8 pt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="w-14 h-14 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl disabled:opacity-20 hover:border-[#D4AF37]/50 transition-all text-[#D4AF37]"
          >
            <ChevronFirst size={24} />
          </button>
          <div className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500">
            Page <span className="text-[#D4AF37]">{currentPage}</span> <span className="mx-3 opacity-20">/</span> {totalPages}
          </div>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="w-14 h-14 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl disabled:opacity-20 hover:border-[#D4AF37]/50 transition-all text-[#D4AF37]"
          >
            <ChevronLast size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

const NoDataRow = () => (
  <tr>
    <td colSpan="6" className="py-40 text-center">
      <div className="flex flex-col items-center gap-6">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-[#D4AF37]/20 border border-white/5">
          <Filter size={36} />
        </div>
        <p className="text-[11px] font-black tracking-[0.4em] uppercase text-gray-600">Aucune archive trouvée</p>
      </div>
    </td>
  </tr>
);

export default ReservationUserTable;