import { ShoppingBag, User, X, MapPin, Tag, Phone, CreditCard, Sparkles, Hash } from "lucide-react";
import React from "react";

const ShowOrder = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-md z-[110] p-2 md:p-4 animate-in fade-in duration-300">
      

      <div className="bg-[#0A0A0A] w-full max-w-2xl rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col max-h-[95vh] overflow-hidden animate-in zoom-in-95 duration-500 border border-white/5 relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 blur-[60px] rounded-full -z-10" />
        <div className="flex justify-between items-center p-8 md:p-10 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-5">
            <div className="bg-gradient-to-br from-[#8B6508] to-[#D4AF37] p-4 rounded-[1.5rem] shadow-xl text-black">
              <ShoppingBag size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="font-serif text-2xl md:text-3xl text-white tracking-tight">
                Bon de <span className="text-[#D4AF37] italic font-light">Commande</span>
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Hash size={12} className="text-[#D4AF37]" />
                <span className="text-[10px] font-black text-gray-500 tracking-[0.3em] uppercase">
                  SÉRIE: {order.ref || "N/A"}
                </span>
              </div>
            </div>
          </div>
          <button
            className="p-3 rounded-2xl bg-white/5 text-gray-400 hover:text-[#D4AF37] hover:bg-white/10 transition-all border border-white/5"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto p-8 md:p-10 space-y-10 custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InfoTile
              icon={<User />}
              label="Propriétaire"
              value={`${order.user.f_name} ${order.user.l_name}`}
              subValue={order.user.email}
            />
            <InfoTile
              icon={<Phone />}
              label="Ligne Directe"
              value={order.client_phone}
            />
            <div className="sm:col-span-2">
              <InfoTile
                icon={<MapPin />}
                label="Destination de Livraison"
                value={order.address}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">
                  Détails des Prestations
                </h2>
              </div>
              <span className="text-[9px] font-black bg-[#D4AF37]/10 px-3 py-1.5 rounded-full text-[#D4AF37] border border-[#D4AF37]/20">
                {order?.items?.length || 0} ARTICLES
              </span>
            </div>

            <div className="bg-white/[0.02] rounded-[2.5rem] border border-white/5 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-white/[0.03] text-gray-500 text-[9px] uppercase font-black tracking-[0.2em] border-b border-white/5">
                  <tr>
                    <th className="px-8 py-6">Produit</th>
                    <th className="px-8 py-6 text-center">Qté</th>
                    <th className="px-8 py-6 text-right">Montant</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.03]">
                  {order?.items?.length > 0 ? (
                    order.items.map((item, index) => (
                      <tr key={item.id || index} className="group transition-colors">
                        <td className="px-8 py-6">
                          <p className="font-bold text-gray-300 text-sm group-hover:text-white transition-colors">
                            {item.item_product.name}
                          </p>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <span className="text-xs font-black text-[#D4AF37]">
                            ×{item.qtte}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right font-serif text-white text-base">
                          {item.total_price} <span className="text-[10px] text-[#D4AF37] font-sans not-italic font-black">DH</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="p-10 text-center text-gray-600 italic text-xs tracking-widest">
                        Aucune donnée disponible
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="p-8 md:p-10 bg-white/[0.02] border-t border-white/5 flex flex-col sm:flex-row gap-8 justify-between items-center">
          <div className="text-center sm:text-left">
            <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mb-2">
              Total à Régler
            </p>
            <div className="flex items-baseline justify-center sm:justify-start gap-2">
              <span className="text-5xl font-serif text-white tracking-tighter">
                {order.total_price}
              </span>
              <span className="text-sm font-black text-[#D4AF37]">MAD</span>
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-4 w-full sm:w-auto">
             <div className="flex items-center gap-3 bg-black border border-white/10 px-5 py-2.5 rounded-2xl shadow-inner">
                <CreditCard size={14} className="text-[#D4AF37]" />
                <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Cash on Delivery</span>
             </div>
             <div className="flex items-center gap-2 px-10 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] bg-[#D4AF37] text-black shadow-[0_10px_30px_rgba(212,175,55,0.2)]">
                <Sparkles size={12} />
                {order.status || "Traitement"}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoTile = ({ icon, label, value, subValue }) => (
  <div className="flex items-start gap-5 p-5 rounded-[2rem] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group">
    <div className="bg-white/5 p-3 rounded-2xl text-[#D4AF37] group-hover:scale-110 transition-transform duration-500">
      {React.cloneElement(icon, { size: 20, strokeWidth: 1.5 })}
    </div>
    <div className="min-w-0">
      <p className="text-[9px] uppercase font-black text-gray-600 mb-1 tracking-widest">
        {label}
      </p>
      <p className="text-sm font-bold text-gray-200 truncate">
        {value}
      </p>
      {subValue && (
        <p className="text-[10px] font-medium text-gray-500 truncate mt-0.5">
          {subValue}
        </p>
      )}
    </div>
  </div>
);

export default ShowOrder;