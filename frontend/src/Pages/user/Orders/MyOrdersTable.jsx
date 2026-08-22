import React, { useContext, useEffect, useState } from "react";
import { getOrderByUser, searchOrder } from "../../../Services/OrderService";
import { toast } from "react-toastify";
import { ChevronFirst, ChevronLast, Eye, Filter, Search, Calendar, Sparkles } from "lucide-react";
import { Context } from "../../../Context/ContextProvider";

const MyOrdersTable = ({ view }) => {
  const { orders, setOrders, refresh } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState({});
  const [orderSearched, setOrderSearched] = useState([]);
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [tri, setTri] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Status Styles adjusted for the Luxury Dark theme
  const statusStyles = {
    pending: "border-[#D4AF37]/30 text-[#D4AF37] bg-[#D4AF37]/5",
    confirmed: "border-blue-500/30 text-blue-400 bg-blue-500/5",
    preparing: "border-orange-500/30 text-orange-400 bg-orange-500/5",
    delivered: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
    canceled: "border-red-500/30 text-red-400 bg-red-500/5",
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await getOrderByUser(setErr);
        setOrders(data);
      } catch {
        toast.error("Échec de la récupération des commandes");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [refresh, setOrders]);

  const dataSource = query.trim() === "" ? orders || [] : orderSearched || [];
  const filterOrders = dataSource.filter((order) => !filterStatus || order.status === filterStatus);

  const sortedOrders = [...filterOrders].sort((a, b) => {
    switch (tri) {
      case "price-asc": return a.total_price - b.total_price;
      case "price-desc": return b.total_price - a.total_price;
      case "date-asc": return new Date(a.date) - new Date(b.date);
      case "date-desc": return new Date(b.date) - new Date(a.date);
      default: return 0;
    }
  });

  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  const currentOrders = sortedOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() === "") { setOrderSearched([]); return; }
    try {
      const data = await searchOrder(value, setErr);
      setOrderSearched(data);
    } catch (err) { console.log(err); }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 bg-[#050505]">
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-t-2 border-[#D4AF37] animate-spin"></div>
          <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-[#D4AF37]/10"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 p-1 bg-[#050505]">
      {/* Search & Filters - Glass Design */}
      <div className="bg-white/[0.02] backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="relative w-full lg:max-w-md group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#D4AF37]/40 group-focus-within:text-[#D4AF37] transition-colors" size={20} />
          <input
            type="text"
            placeholder="Rechercher par référence..."
            value={query}
            onChange={handleSearch}
            className="w-full pl-14 pr-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl text-white focus:border-[#D4AF37]/40 outline-none transition-all placeholder:text-gray-600"
          />
        </div>

        <div className="flex gap-5 w-full lg:w-auto">
          <select
            value={filterStatus}
            onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
            className="flex-1 lg:w-48 bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-sm font-medium text-gray-400 outline-none focus:border-[#D4AF37]/40 transition-all cursor-pointer appearance-none"
          >
            <option value="" className="bg-[#050505]">Tous les Statuts</option>
            {Object.keys(statusStyles).map(s => (
              <option key={s} value={s} className="bg-[#050505]">{s.toUpperCase()}</option>
            ))}
          </select>

          <select
            onChange={(e) => { setTri(e.target.value); setCurrentPage(1); }}
            value={tri}
            className="flex-1 lg:w-48 bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-sm font-medium text-gray-400 outline-none focus:border-[#D4AF37]/40 transition-all cursor-pointer appearance-none"
          >
            <option value="" className="bg-[#050505]">Trier par</option>
            <option value="price-desc" className="bg-[#050505]">Prix: Élevé</option>
            <option value="price-asc" className="bg-[#050505]">Prix: Bas</option>
            <option value="date-desc" className="bg-[#050505]">Plus récent</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white/[0.01] rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden">
        <div className="hidden md:block">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]/60">Référence</th>
                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]/60">Date</th>
                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]/60">Client</th>
                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]/60 text-center">Total</th>
                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]/60 text-center">Statut</th>
                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]/60 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-10 py-8">
                      <span className="font-mono text-xs font-bold text-gray-500 group-hover:text-[#D4AF37] transition-colors">#{order.ref}</span>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-3 text-gray-300 text-sm font-medium">
                        <Calendar size={14} className="text-[#D4AF37]/40" /> {new Date(order.date).toLocaleDateString('fr-FR')}
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="text-white font-serif text-base">{order.user.f_name} {order.user.l_name}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Sparkles size={10} className="text-[#D4AF37]/40" />
                        <span className="text-[9px] text-[#D4AF37]/40 font-black uppercase tracking-widest">Client VIP</span>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-center font-serif text-lg text-white">
                      {order.total_price} <span className="text-[10px] text-[#D4AF37]">DH</span>
                    </td>
                    <td className="px-10 py-8">
                      <div className={`mx-auto w-fit px-5 py-2 rounded-full border text-[9px] font-black uppercase tracking-[0.2em] shadow-lg backdrop-blur-md ${statusStyles[order.status]}`}>
                        {order.status.replace('_', ' ')}
                      </div>
                    </td>
                    <td className="px-10 py-8 text-center">
                      <button
                        onClick={() => view(order)}
                        className="group/btn inline-flex items-center justify-center w-12 h-12 bg-white/5 hover:bg-[#D4AF37] rounded-2xl transition-all duration-500 text-[#D4AF37] hover:text-black shadow-xl"
                      >
                        <Eye size={20} className="transition-transform group-hover/btn:scale-110" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <NoDataRow />
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View - Re-styled for Dark theme */}
        <div className="md:hidden divide-y divide-white/5">
          {currentOrders.map((order) => (
            <div key={order.id} className="p-8 flex flex-col gap-6 bg-white/[0.01]">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-[#D4AF37]/50 uppercase tracking-[0.3em]">#{order.ref}</span>
                  <h3 className="text-white font-serif text-lg">{order.user.f_name} {order.user.l_name}</h3>
                </div>
                <button onClick={() => view(order)} className="p-4 bg-white/5 rounded-2xl text-[#D4AF37]"><Eye size={20} /></button>
              </div>
              <div className="flex justify-between items-center">
                <div className={`px-4 py-1.5 rounded-full border text-[8px] font-black uppercase tracking-widest ${statusStyles[order.status]}`}>
                  {order.status}
                </div>
                <span className="font-serif text-xl text-white">{order.total_price} DH</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination - Classy Dark Design */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 py-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
            className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl disabled:opacity-20 text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all"
          >
            <ChevronFirst size={20} />
          </button>
          <div className="flex gap-3">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-12 h-12 rounded-2xl text-[10px] font-black transition-all border ${currentPage === i + 1 ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)]" : "bg-white/5 text-gray-500 border-white/10 hover:border-white/20"}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
            className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl disabled:opacity-20 text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all"
          >
            <ChevronLast size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

const NoDataRow = () => (
  <tr>
    <td colSpan="6" className="py-44 text-center">
      <div className="flex flex-col items-center gap-6 opacity-40">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-[#D4AF37]/20 border border-white/5">
          <Filter size={40} />
        </div>
        <p className="text-[11px] font-black uppercase tracking-[0.5em] text-[#D4AF37]/50">Aucune archive trouvée</p>
      </div>
    </td>
  </tr>
);

export default MyOrdersTable;