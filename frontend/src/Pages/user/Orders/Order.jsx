import React, { useEffect, useState } from "react";
import { GetAllItems } from "../../../Services/CartService";
import { addOrder } from "../../../Services/OrderService";
import { ArrowLeft, MapPin, Phone, MessageSquare, CreditCard, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [err, setErr] = useState({});
  const [cartInfo, setCartInfo] = useState([]);
  const [total, setTotal] = useState(null);
  const navigate = useNavigate();
  const [order, setOrder] = useState({
    client_phone: "",
    address: "",
    note: "",
    items: [],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCart = async () => {
      try {
        const data = await GetAllItems(setErr);
        setCartInfo(data.items || []);
        setTotal(data.total || 0);
      } catch (e) {
        console.log("Error fetching cart:", e);
      }
    };
    fetchCart();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirme = async (e) => {
    e.preventDefault();
    const formattedItems = cartInfo.map((item) => ({
      product_id: item.product.id,
      qtte: item.qtte,
    }));

    const dataToSend = {
      client_phone: order.client_phone,
      address: order.address,
      note: order.note,
      items: formattedItems,
    };

    await addOrder(dataToSend, setErr);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans pb-32 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[150px] -z-10" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 relative z-10">
        
        {/* Back Link - Gold hover */}
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 text-gray-500 hover:text-[#D4AF37] transition-all text-[10px] font-black uppercase tracking-[0.4em] mb-16"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Retour au menu
        </button>

        <header className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles size={16} className="text-[#D4AF37]" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37]/60">Finalisation de commande</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-serif text-white leading-tight">
            Votre <span className="italic font-light text-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]">Expérience</span>
          </h1>
          <div className="h-[1px] w-32 bg-gradient-to-r from-[#D4AF37] to-transparent mt-6"></div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          
          {/* Form Section - Glassmorphism */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleConfirme} className="space-y-12 bg-white/[0.02] backdrop-blur-xl p-10 md:p-16 rounded-[3rem] border border-white/5 shadow-2xl">
              
              <div className="grid grid-cols-1 gap-12">
                <InputField
                  label="Téléphone de contact"
                  icon={<Phone size={18} />}
                  value={order.client_phone}
                  name="client_phone"
                  placeholder="+212 6..."
                  handleChange={handleChange}
                />

                <div className="flex flex-col gap-5">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37]/60 flex items-center gap-3">
                    <MapPin size={16} className="text-[#D4AF37]" /> Adresse de livraison
                  </label>
                  <textarea
                    name="address"
                    value={order.address}
                    onChange={handleChange}
                    placeholder="Votre adresse complète à Casablanca..."
                    className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 focus:border-[#D4AF37]/40 outline-none transition-all min-h-[140px] text-gray-200 placeholder:text-gray-700 text-lg font-light"
                  />
                </div>

                <div className="flex flex-col gap-5">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37]/60 flex items-center gap-3">
                    <MessageSquare size={16} className="text-[#D4AF37]" /> Notes Particulières (Optionnel)
                  </label>
                  <textarea
                    name="note"
                    value={order.note}
                    onChange={handleChange}
                    placeholder="Allergies, instructions de livraison..."
                    className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 focus:border-[#D4AF37]/40 outline-none transition-all min-h-[120px] text-gray-200 placeholder:text-gray-700 text-lg font-light"
                  />
                </div>
              </div>

              <button 
                className="group w-full bg-[#D4AF37] hover:bg-white text-black font-black py-7 rounded-[2rem] transition-all duration-700 uppercase tracking-[0.4em] text-[11px] flex items-center justify-center gap-4 overflow-hidden shadow-[0_20px_40px_rgba(212,175,55,0.15)] hover:shadow-[#D4AF37]/20" 
                type="submit"
              >
                <span className="relative z-10 font-black">Confirmer la commande</span>
              </button>
            </form>
          </motion.div>

          {/* Sidebar Section (Récapitulatif) - Minimalist Luxury */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-5 lg:sticky lg:top-12"
          >
            <div className="bg-white/[0.01] border border-white/5 rounded-[3rem] p-12 backdrop-blur-sm shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-3xl -z-10" />
              
              <h2 className="text-3xl font-serif mb-10 text-white flex items-center gap-4">
                Mon Panier <span className="text-[10px] text-[#D4AF37] font-black tracking-widest uppercase opacity-40">Détails</span>
              </h2>

              <div className="space-y-8 mb-12">
                {cartInfo.length > 0 ? cartInfo.map((cart) => (
                  <CartItem
                    key={cart.id}
                    name={cart.product.name}
                    quantity={cart.qtte}
                    price={cart.product.price * cart.qtte}
                  />
                )) : (
                  <p className="text-gray-600 italic text-sm">Votre panier est vide...</p>
                )}
              </div>

              <div className="pt-10 border-t border-white/5">
                <div className="flex justify-between items-end mb-10">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37]">Total Prestige</span>
                    <p className="text-gray-500 text-[9px] uppercase tracking-tighter italic">TVA incluse, service L'Étoile d'Or</p>
                  </div>
                  <span className="text-5xl font-serif text-white font-bold">
                    {total} <small className="text-sm font-sans text-[#D4AF37] uppercase ml-1">DH</small>
                  </span>
                </div>
                
                <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl flex items-center gap-5 text-gray-400 italic text-sm transition-all hover:bg-white/5">
                  <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37]">
                    <CreditCard size={18} />
                  </div>
                  <span>Paiement discret à la livraison</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

// Sub-components re-styled for the Dark Theme
const InputField = ({ label, value, name, handleChange, icon, placeholder }) => (
  <div className="flex flex-col gap-5">
    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37]/60 flex items-center gap-3">
      {icon} {label}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className="bg-white/[0.03] border border-white/10 rounded-3xl px-8 py-5 focus:border-[#D4AF37]/40 outline-none transition-all text-white placeholder:text-gray-700 font-light text-lg"
    />
  </div>
);

const CartItem = ({ name, quantity, price }) => (
  <div className="flex justify-between items-center group">
    <div className="space-y-2">
      <p className="font-serif text-xl text-white group-hover:text-[#D4AF37] transition-colors duration-500">{name}</p>
      <div className="flex items-center gap-2">
        <div className="w-1 h-1 bg-[#D4AF37] rounded-full" />
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Quantité: {quantity}</p>
      </div>
    </div>
    <div className="text-right">
      <span className="font-serif text-lg text-white/90">{price} <span className="text-[10px] text-[#D4AF37]">DH</span></span>
    </div>
  </div>
);

export default Order;