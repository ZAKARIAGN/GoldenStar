import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GetProductById } from "../../../Services/ProductService";
import { ArrowLeft, Minus, Plus, ShoppingCart, AlertCircle, ChefHat } from "lucide-react";
import { AddCart } from "../../../Services/CartService";
import { motion } from "framer-motion";

const ErrMsg = ({ msg }) => {
  if (!msg) return null;
  return (
    <div className="flex items-center gap-2 text-rose-500 bg-rose-50 border border-rose-100 p-4 rounded-2xl mb-6 animate-in fade-in slide-in-from-top-2">
      <AlertCircle size={16} />
      <span className="text-xs font-bold tracking-tight">{msg}</span>
    </div>
  );
};

const ShowDish = () => {
  const { id } = useParams();
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const data = await GetProductById(setErr, id);
        setDish(data);
      } catch {
        setErr("Erreur lors du chargement du produit.");
      } finally {
        setLoading(false);
      }
    };
    fetchDish();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    setIsSubmitting(true);
    try {
      await AddCart({ product_id: dish?.id, qtte: quantity }, setErr);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const img_url = dish?.img?.startsWith("data:") || dish?.img?.startsWith("http")
    ? dish?.img : `http://localhost:8000/${dish?.img}`;

  if (loading) return (
    <div className="h-screen bg-[#faf9f6] flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-400">Signature d'excellence...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center p-6 md:p-12">
      <div className="max-w-6xl w-full bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.03)]">
        <div className="grid md:grid-cols-2">
          
          {/* Left: Image Canvas */}
          <div className="relative h-[400px] md:h-[650px] overflow-hidden bg-slate-50">
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              src={img_url}
              alt={dish?.name}
              className="w-full h-full object-cover"
            />
            <Link
              to="/user/menu"
              className="absolute top-8 left-8 p-4 bg-white/90 backdrop-blur-md rounded-2xl text-slate-900 shadow-xl hover:bg-orange-600 hover:text-white transition-all flex items-center gap-2 group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">Menu</span>
            </Link>
          </div>

          {/* Right: Fine Dining Details */}
          <div className="p-8 md:p-16 flex flex-col justify-center">
            {err?.errors && (
              <div className="space-y-2">
                {err.errors.product_id && <ErrMsg msg={err.errors.product_id[0]} />}
                {err.errors.qtte && <ErrMsg msg={err.errors.qtte[0]} />}
              </div>
            )}

            <header className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-[1px] w-10 bg-orange-500"></span>
                <span className="text-orange-600 text-[10px] font-black uppercase tracking-[0.4em]">
                  {dish?.Categories?.cat || "Chef's Selection"}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-['Playfair_Display'] text-slate-950 leading-tight mb-6">
                {dish?.name}
              </h1>
              <div className="flex items-center gap-2 text-slate-400">
                <ChefHat size={16} />
                <p className="text-xs font-bold tracking-widest uppercase">Élaboré par nos soins</p>
              </div>
            </header>

            <p className="text-slate-500 text-lg font-medium leading-relaxed italic mb-10 pl-6 border-l-2 border-orange-100">
              "{dish?.description}"
            </p>

            <div className="flex items-center gap-4 mb-12">
              <span className="text-5xl font-black text-slate-950 tracking-tighter">
                {dish?.price}
              </span>
              <span className="text-xl font-light text-orange-500 italic uppercase tracking-widest">DH</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Modern Quantity Selector */}
              <div className="flex items-center justify-between px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 flex-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-md transition-all text-slate-400 hover:text-orange-600"
                >
                  <Minus size={18} />
                </button>
                <span className="text-slate-900 font-black text-lg w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-md transition-all text-slate-400 hover:text-orange-600"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* Elegant Add to Cart */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-[1.5] group relative overflow-hidden bg-slate-950 text-white rounded-2xl py-4 flex items-center justify-center gap-4 shadow-2xl shadow-slate-200 active:scale-95 disabled:opacity-70 transition-all"
              >
                <div className="absolute inset-0 bg-orange-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <ShoppingCart size={20} className="relative z-10" />
                <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.2em]">
                  {isSubmitting ? "En cours..." : "Ajouter au Panier"}
                </span>
              </button>
            </div>

            <div className="mt-12 flex items-center justify-center gap-3 py-6 border-t border-slate-50">
              <div className="h-1 w-1 bg-orange-500 rounded-full"></div>
              <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.3em]">
                Gastronomie française authentique
              </p>
              <div className="h-1 w-1 bg-orange-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDish;