import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../Context/ContextProvider";
import { UpdateProduct } from "../../../Services/ProductService";
import Input from "../../../Components/Input";
import ErrMsg from "../../../Components/ErrMsg";
import { X, Upload, Edit3, Sparkles } from "lucide-react";

const EditProductForm = ({ product, onClose }) => {
  const [productEdit, setProductEdit] = useState(product);
  const { setRefresh } = useContext(Context);
  const [err, setErr] = useState({});
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    setProductEdit(product);
    if (product?.img) {
      if (product.img.startsWith("data:") || product.img.startsWith("http")) {
        setImagePreview(product.img);
      } else {
        setImagePreview(`http://localhost:8000/${product.img}`);
      }
    }
  }, [product]);

  const handdleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "img") {
      const file = files[0];
      if (file) {
        if (!file.type.startsWith("image/")) {
          setErr({ ...err, img: ["Veuillez sélectionner une image valide"] });
          return;
        }
        if (file.size > 2 * 1024 * 1024) {
          setErr({ ...err, img: ["L'image ne doit pas dépasser 2Mo"] });
          return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          setProductEdit({ ...productEdit, img: reader.result });
          setImagePreview(reader.result);
          const newErr = { ...err };
          delete newErr.img;
          setErr(newErr);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setProductEdit({ ...productEdit, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setErr({});
      await UpdateProduct(productEdit, setErr, onClose);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0A0A0A] w-full max-w-2xl rounded-[3rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-white/5 animate-in fade-in zoom-in duration-500 relative">


      <div className="absolute top-0 left-0 w-32 h-32 bg-[#D4AF37]/5 blur-[60px] -z-10" />
      <div className="flex justify-between items-center p-8 md:p-10 border-b border-white/5">
        <div className="flex items-center gap-5">
          <div className="bg-gradient-to-br from-[#8B6508] to-[#D4AF37] p-3.5 rounded-2xl shadow-[0_0_20px_rgba(212,175,55,0.2)] text-black">
            <Edit3 size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-serif text-white leading-tight">
              Sublimer le <span className="text-[#D4AF37] italic font-light">Plat</span>
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <Sparkles size={10} className="text-[#D4AF37]/60" />
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#D4AF37]/60 font-black">
                ID: #{product?.id} • {product?.name}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-3 hover:bg-white/5 rounded-full transition-all text-gray-500 hover:text-[#D4AF37]"
        >
          <X size={22} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="overflow-y-auto p-8 md:p-10 space-y-8 custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37]/60 ml-1">Intitulé du Plat</label>
            <input
              type="text"
              name="name"
              value={productEdit.name}
              onChange={handdleChange}
              className="w-full bg-white/[0.03] text-white border border-white/10 rounded-2xl px-5 py-4 focus:border-[#D4AF37]/40 outline-none transition-all font-light"
            />
            <ErrMsg msg={err.name?.[0]} />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37]/60 ml-1">Tarification (DH)</label>
            <input
              type="number"
              name="price"
              value={productEdit.price}
              onChange={handdleChange}
              className="w-full bg-white/[0.03] text-white border border-white/10 rounded-2xl px-5 py-4 focus:border-[#D4AF37]/40 outline-none transition-all font-light"
            />
            <ErrMsg msg={err.price?.[0]} />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37]/60 ml-1">Description Gastronomique</label>
            <textarea
              name="description"
              rows="3"
              value={productEdit.description}
              onChange={handdleChange}
              className="w-full bg-white/[0.03] text-white border border-white/10 rounded-2xl p-5 focus:border-[#D4AF37]/40 outline-none transition-all resize-none font-light leading-relaxed"
            />
            <ErrMsg msg={err.description?.[0]} />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37]/60 ml-1">Catégorie</label>
            <select
              name="cat_id"
              value={productEdit.cat_id}
              onChange={handdleChange}
              className="w-full bg-white/[0.03] text-white border border-white/10 rounded-2xl p-5 focus:border-[#D4AF37]/40 outline-none appearance-none cursor-pointer font-light"
            >
              <option value="" className="bg-[#0A0A0A]">Sélectionner</option>
              <option value="1" className="bg-[#0A0A0A]">Plats Signatures</option>
              <option value="2" className="bg-[#0A0A0A]">Accompagnements</option>
              <option value="3" className="bg-[#0A0A0A]">Entrées Froides</option>
              <option value="5" className="bg-[#0A0A0A]">Douceurs Sucrées</option>
              <option value="6" className="bg-[#0A0A0A]">Vins & Spiritueux</option>
            </select>
            <ErrMsg msg={err.cat_id?.[0]} />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37]/60 ml-1">Statut</label>
            <select
              name="status"
              value={productEdit.status}
              onChange={handdleChange}
              className="w-full bg-white/[0.03] text-white border border-white/10 rounded-2xl p-5 focus:border-[#D4AF37]/40 outline-none appearance-none cursor-pointer font-light"
            >
              <option value="available" className="bg-[#0A0A0A]">Disponible en Salle</option>
              <option value="unavailable" className="bg-[#0A0A0A]">Momentanément Épuisé</option>
            </select>
            <ErrMsg msg={err.status?.[0]} />
          </div>

          <div className="md:col-span-2 space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37]/60 ml-1">Visuel du Chef</label>
            <div className="flex flex-col md:flex-row items-center gap-8 p-6 border-2 border-dashed border-white/5 rounded-[2.5rem] hover:border-[#D4AF37]/20 transition-all group bg-white/5">
              <div className="relative w-40 h-40 bg-black rounded-3xl flex items-center justify-center overflow-hidden shrink-0 shadow-2xl border border-white/5">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover animate-in fade-in duration-500" />
                ) : (
                  <Upload className="text-[#D4AF37]/30 group-hover:text-[#D4AF37] transition-colors" size={32} />
                )}
                <input
                  type="file"
                  name="img"
                  onChange={handdleChange}
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              <div className="text-center md:text-left space-y-2">
                <p className="text-sm text-white font-medium">Changer la Signature Visuelle</p>
                <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase italic">Laissez vide pour conserver l'image actuelle</p>
                <ErrMsg msg={err.img?.[0]} />
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="p-8 md:p-10 border-t border-white/5 flex gap-6 bg-black/40">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-5 rounded-full font-black text-[10px] tracking-[0.3em] uppercase text-gray-500 hover:text-white transition-all active:scale-95"
        >
          Annuler
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="relative group flex-[2] p-[1px] overflow-hidden rounded-full transition-all duration-700 active:scale-95 disabled:opacity-50"
        >
          <div className={`absolute inset-0 bg-gradient-to-r from-[#8B6508] via-[#C25E0A] to-[#8B6508] ${loading ? 'animate-[shimmer_1.5s_infinite]' : 'animate-[shimmer_4s_infinite]'}`} />

          <div className="relative bg-[#0A0A0A] rounded-full py-5 flex items-center justify-center group-hover:bg-transparent transition-all duration-500">
            <span className="relative z-10 uppercase text-[11px] font-black tracking-[0.5em] text-[#D4AF37] group-hover:text-black transition-all duration-500">
              {loading ? "Mise à jour..." : "Enregistrer les Changements"}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default EditProductForm;