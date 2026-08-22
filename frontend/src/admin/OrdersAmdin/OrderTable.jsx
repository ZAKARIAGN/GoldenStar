import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../Context/ContextProvider";
import { getAllOrders, searchOrder, updateStatus } from "../../../Services/OrderService";
import { toast } from "react-toastify";
import { ChevronFirst, ChevronLast, Eye, Filter, Search, ShoppingBag, Sparkles, Calendar, User, CreditCard } from "lucide-react";

const OrderTable = ({ view }) => {
  const { orders, setOrders, refresh } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState({});
  const [orderSearched, setOrderSearched] = useState([]);
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [tri, setTri] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Status Styles - Dark & Elegant
  const statusStyles = {
    pending: "border-amber-500/30 text-amber-500 bg-amber-500/5",
    confirmed: "border-blue-500/30 text-blue-500 bg-blue-500/5",
    preparing: "border-[#D4AF37]/30 text-[#D4AF37] bg-[#D4AF37]/5",
    delivered: "border-green-500/30 text-green-500 bg-green-500/5",
    canceled: "border-red-500/30 text-red-500 bg-red-500/5",
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await getAllOrders(setErr);
        setOrders(data);
      } catch {
        toast.error("Erreur lors de la récupération des commandes");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [refresh]);

  const dataSource = query.trim() === "" ? orders || [] : orderSearched || [];

  const filterOrders = dataSource.filter((order) => {
    return !filterStatus || order.status === filterStatus;
  });

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
    if (value.trim() === "") {
      setOrderSearched([]);
      return;
    }
    try {
      const data = await searchOrder(value, setErr);
      setOrderSearched(data);
    } catch (err) { console.log(err); }
  };

  const handleChangeStatus = async (e, orderID) => {
    const newStatus = e.target.value;
    try {
      const updatedOrder = await updateStatus(orderID, newStatus, setErr);
      setOrders((prev) => prev.map((o) => (o.id === orderID ? updatedOrder : o)));
      toast.success("Statut mis à jour avec succès");
    } catch {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-80 gap-6">
        <div className="relative">
          <div className="w-14 h-14 border-2 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin"></div>
          <Sparkles className="absolute inset-0 m-auto text-[#D4AF37] animate-pulse" size={18} />
        </div>
        <p className="text-[#D4AF37]/50 font-black text-[10px] uppercase tracking-[0.4em]">Synchronisation des ventes...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 px-2">
        <div className="relative w-full lg:max-w-md group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/30 group-focus-within:text-[#D4AF37] transition-colors" />
          <input
            type="text"
            placeholder="Rechercher une référence ou un client..."
            value={query}
            onChange={handleSearch}
            className="w-full pl-12 pr-4 py-4 bg-[#0A0A0A] border border-white/5 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/30 transition-all font-light"
          />
        </div>

        <div className="flex flex-row items-center gap-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-56">
            <select
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
              className="w-full pl-4 pr-10 py-4 bg-[#0A0A0A] border border-white/5 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-2xl appearance-none focus:outline-none focus:border-[#D4AF37]/30 transition-all cursor-pointer shadow-xl"
            >
              <option value="" className="bg-black">Tous les Statuts</option>
              {Object.keys(statusStyles).map(s => (
                <option key={s} value={s} className="bg-black">{s}</option>
              ))}
            </select>
            <Filter size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/30 pointer-events-none" />
          </div>

          <div className="relative flex-1 lg:w-56">
            <select
              onChange={(e) => { setTri(e.target.value); setCurrentPage(1); }}
              value={tri}
              className="w-full pl-4 pr-10 py-4 bg-[#0A0A0A] border border-white/5 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-2xl appearance-none focus:outline-none focus:border-[#D4AF37]/30 transition-all cursor-pointer shadow-xl"
            >
              <option value="" className="bg-black text-gray-500">Trier l'affichage</option>
              <option value="price-asc" className="bg-black">Prix: Croissant</option>
              <option value="price-desc" className="bg-black">Prix: Décroissant</option>
              <option value="date-asc" className="bg-black">Date: Ancien</option>
              <option value="date-desc" className="bg-black">Date: Récent</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-[#0A0A0A] rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/[0.02] text-[#D4AF37]/50 text-[9px] uppercase tracking-[0.3em] font-black border-b border-white/5">
              <tr>
                <th className="px-10 py-7">Référence</th>
                <th className="px-10 py-7">Date d'émission</th>
                <th className="px-10 py-7">Détails Client</th>
                <th className="px-10 py-7 text-center">Montant Total</th>
                <th className="px-10 py-7 text-center">État Livraison</th>
                <th className="px-10 py-7 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/[0.01] transition-all group">
                    <td className="px-10 py-6">
                      <span className="text-white font-serif text-base group-hover:text-[#D4AF37] transition-colors uppercase">#{order.ref}</span>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <Calendar size={14} className="text-[#D4AF37]/40" />
                        {new Date(order.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-white font-bold text-sm flex items-center gap-2">
                          <User size={12} className="text-[#D4AF37]/50" />
                          {order.user.f_name} {order.user.l_name}
                        </span>
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{order.user.email}</span>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-center">
                      <span className="text-white font-light text-lg italic tracking-tight">
                        {order.total_price} <small className="text-[10px] text-[#D4AF37] not-italic font-black">DH</small>
                      </span>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex justify-center">
                        <select
                          value={order.status}
                          onChange={(e) => handleChangeStatus(e, order.id)}
                          className={`px-5 py-2 rounded-full text-[9px] font-black uppercase border outline-none cursor-pointer transition-all ${statusStyles[order.status]}`}
                        >
                          {Object.keys(statusStyles).map((s) => (
                            <option key={s} value={s} className="bg-black text-white">
                              {s.toUpperCase()}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <button
                        onClick={() => view(order)}
                        className="p-3 bg-white/[0.03] border border-white/5 text-gray-500 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 rounded-2xl transition-all"
                      >
                        <Eye size={18} />
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

        <div className="md:hidden divide-y divide-white/[0.03]">
          {currentOrders.length > 0 ? (
            currentOrders.map((order) => (
              <div key={order.id} className="p-8 flex flex-col gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 blur-3xl" />
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">#{order.ref}</span>
                    <h3 className="text-white font-serif text-xl mt-1">{order.user.f_name} {order.user.l_name}</h3>
                  </div>
                  <button onClick={() => view(order)} className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl text-[#D4AF37] shadow-xl">
                    <Eye size={22} />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                    <p className="text-[9px] uppercase text-gray-500 font-black tracking-widest mb-1">Date</p>
                    <p className="text-white text-xs">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/5 text-right">
                    <p className="text-[9px] uppercase text-gray-500 font-black tracking-widest mb-1">Total</p>
                    <p className="text-[#D4AF37] text-lg font-serif">{order.total_price} DH</p>
                  </div>
                </div>

                <select
                  value={order.status}
                  onChange={(e) => handleChangeStatus(e, order.id)}
                  className={`w-full py-4 px-4 rounded-2xl text-center text-[10px] font-black uppercase border outline-none ${statusStyles[order.status]}`}
                >
                  {Object.keys(statusStyles).map((s) => (
                    <option key={s} value={s}>{s.toUpperCase()}</option>
                  ))}
                </select>
              </div>
            ))
          ) : (
            <div className="py-20 text-center text-gray-600 font-black uppercase text-xs tracking-widest">Aucune commande trouvée</div>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 py-8">
        <PaginationButton onClick={() => setCurrentPage(1)} disabled={currentPage === 1} icon={<ChevronFirst size={20} />} />
        <div className="flex gap-3">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-12 h-12 rounded-2xl text-[10px] font-black transition-all duration-500 ${currentPage === i + 1 ? "bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]" : "bg-[#0A0A0A] text-gray-500 border border-white/10 hover:border-[#D4AF37]/50"}`}
            >
              {String(i + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
        <PaginationButton onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} icon={<ChevronLast size={20} />} />
      </div>
    </div>
  );
};

const NoDataRow = () => (
  <tr>
    <td colSpan="6" className="py-40 text-center">
      <div className="flex flex-col items-center gap-6">
        <div className="w-20 h-20 bg-white/[0.02] border border-white/5 rounded-full flex items-center justify-center text-[#D4AF37]/20">
          <ShoppingBag size={40} />
        </div>
        <p className="text-gray-500 font-black uppercase text-xs tracking-[0.3em]">Aucune transaction enregistrée</p>
      </div>
    </td>
  </tr>
);

const PaginationButton = ({ onClick, disabled, icon }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#0A0A0A] border border-white/10 text-[#D4AF37] disabled:opacity-20 hover:border-[#D4AF37]/50 transition-all shadow-2xl"
  >
    {icon}
  </button>
);

export default OrderTable;