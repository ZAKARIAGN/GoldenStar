import { useState } from "react";
import { AddQtte, DeleteItem, MinseQtte } from "../Services/CartService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { X, Minus, Plus, ShoppingBag, Trash2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const CartDrawer = ({ isOpen, onClose, items, total }) => {
  const [err, setErr] = useState({});

  const handdleDelete = async (id) => {
    if (!window.confirm("Voulez-vous supprimer ce plat de votre panier ?"))
      return;
    try {
      await DeleteItem(id, setErr);
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  };

  const handleAdd = async (id) => {
    try {
      await AddQtte(id, setErr);
    } catch {
      toast.error("Erreur de synchronisation");
    }
  };

  const handleMinse = async (id) => {
    try {
      await MinseQtte(id, setErr);
    } catch {
      toast.error("Erreur de synchronisation");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-md bg-[#0A0A0A] h-full shadow-[ -10px_0_50px_rgba(0,0,0,0.5)] flex flex-col border-l border-white/5"
          >
            <div className="flex justify-between items-center px-10 py-12 border-b border-white/5">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-[#D4AF37]" />
                  <h2 className="text-3xl font-serif text-white">
                    Votre <span className="italic font-light text-[#D4AF37]">Sélection</span>
                  </h2>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37]/50">
                  {items.length} Expériences gastronomiques
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 text-gray-500 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-500 border border-white/5"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-10 py-8 space-y-10 custom-scrollbar">
              {items.length > 0 ? (
                items.map((item, index) => {
                  const rawImg = item?.product?.img;
                  const img_url =
                    rawImg?.startsWith("data:") || rawImg?.startsWith("http")
                      ? rawImg
                      : `http://localhost:8000/${rawImg}`;

                  return (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-6 items-center group"
                    >
                      <div className="w-24 h-24 bg-white/5 rounded-[1.5rem] overflow-hidden border border-white/10 flex-shrink-0 relative group-hover:border-[#D4AF37]/40 transition-colors duration-500 shadow-2xl">
                        <img
                          src={img_url}
                          alt={item.product?.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                        />
                      </div>

                      <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-start">
                          <h3 className="font-serif text-lg text-white leading-tight group-hover:text-[#D4AF37] transition-colors">
                            {item.product?.name || "Produit"}
                          </h3>
                          <button
                            onClick={() => handdleDelete(item.id)}
                            className="text-gray-600 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <p className="text-[#D4AF37] font-serif text-base">
                          {item.product?.price || "0.00"}{" "}
                          <span className="text-[10px] font-sans uppercase tracking-widest opacity-60 ml-1">DH</span>
                        </p>

                        <div className="flex items-center">
                          <div className="inline-flex items-center bg-white/5 rounded-2xl p-1 border border-white/10 shadow-inner">
                            <button
                              className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-[#D4AF37] transition-colors"
                              onClick={() => handleMinse(item.id)}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-10 text-center text-sm font-serif text-white">
                              {item.qtte}
                            </span>
                            <button
                              className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-[#D4AF37] transition-colors"
                              onClick={() => handleAdd(item.id)}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-20">
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center">
                    <ShoppingBag size={48} strokeWidth={1} className="text-[#D4AF37]" />
                  </div>
                  <p className="text-[11px] font-black uppercase tracking-[0.4em] text-white">
                    Votre coffret est vide
                  </p>
                </div>
              )}
            </div>
            <div className="p-10 bg-white/[0.02] border-t border-white/5 backdrop-blur-xl">
              <div className="flex justify-between items-end mb-10">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37]">
                    Total Prestige
                  </p>
                  <p className="text-[9px] text-gray-500 italic uppercase tracking-tighter">
                    Service L'Étoile d'Or inclus
                  </p>
                </div>
                <span className="text-4xl font-serif text-white font-bold">
                  {total} <small className="text-sm font-sans text-[#D4AF37] uppercase">DH</small>
                </span>
              </div>

              <Link
                to={"/user/placeOrder"}
                onClick={onClose}
                className="group relative w-full flex items-center justify-center py-6 bg-[#D4AF37] text-black text-[11px] uppercase tracking-[0.4em] font-black rounded-3xl overflow-hidden transition-all duration-500 shadow-[0_15px_30px_rgba(212,175,55,0.15)] hover:shadow-[#D4AF37]/30 hover:bg-white"
              >
                <span className="relative z-10 transition-all duration-500 group-hover:scale-110">
                  Passer au paiement
                </span>
              </Link>

              <button
                onClick={onClose}
                className="w-full mt-8 text-[9px] font-black uppercase tracking-[0.3em] text-gray-600 hover:text-[#D4AF37] transition-all duration-300"
              >
                Continuer la découverte
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};