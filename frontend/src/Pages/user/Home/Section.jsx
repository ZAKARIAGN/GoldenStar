import React, { useEffect, useState } from "react";
import { GetAllProducts } from "../../../Services/ProductService";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const Section = () => {
  const [dishes, setDishes] = useState([]);
  const [errMsg, setErrMsg] = useState(null);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const data = await GetAllProducts(setErrMsg);
        setDishes(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDishes();
  }, []);

  return (
    <div className="flex flex-col items-center bg-[#050505] text-white overflow-hidden py-32 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

      <div className="flex flex-col items-center gap-4 mb-28 text-center px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-2"
        >
          <span className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[#D4AF37]"></span>
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-[#D4AF37] animate-pulse" />
            <p className="text-[#D4AF37] text-[11px] font-black tracking-[0.5em] uppercase">
              L'Art Culinaire
            </p>
          </div>
          <span className="h-[1px] w-10 bg-gradient-to-l from-transparent to-[#D4AF37]"></span>
        </motion.div>

        <h2 className="text-5xl md:text-8xl font-serif text-white">
          Nos{" "}
          <span className="italic font-light text-[#D4AF37] drop-shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            Signatures
          </span>
        </h2>

        <p className="max-w-xl text-gray-400 text-sm md:text-base font-medium leading-relaxed mt-6 tracking-wide">
          Une immersion dans le raffinement andalou, où chaque ingrédient est
          choisi pour sa noblesse et son caractère unique.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-x-16 gap-y-32 max-w-7xl px-6 relative z-10">
        {dishes.slice(0, 3).map((dishe, index) => {
          let img_url = "";
          if (dishe?.img) {
            img_url =
              dishe.img.startsWith("data:") || dishe.img.startsWith("http")
                ? dishe.img
                : `http://localhost:8000/${dishe.img}`;
          }

          return (
            <motion.div
              key={dishe.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.2 }}
              className="group relative w-full sm:w-[380px] flex flex-col items-center"
            >
              <div className="relative w-full h-[520px] overflow-hidden rounded-[2.5rem] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                <div
                  style={{ backgroundImage: `url(${img_url})` }}
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                ></div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80"></div>

                <span className="absolute top-8 right-8 bg-[#0A0A0A]/80 backdrop-blur-xl text-[#D4AF37] px-6 py-2.5 rounded-full text-[12px] font-black tracking-widest border border-[#D4AF37]/30 shadow-2xl">
                  {dishe.price} DH
                </span>
              </div>

              <div className="relative z-10 -mt-20 w-[90%] bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-[2rem] p-10 text-center shadow-[0_30px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-700 group-hover:border-[#D4AF37]/50 group-hover:-translate-y-4">
                <span className="text-[10px] tracking-[0.4em] uppercase text-[#D4AF37] font-black mb-4 block opacity-80">
                  {dishe.categories?.cat || "Chef's Selection"}
                </span>

                <h3 className="text-3xl font-serif text-white mb-5 group-hover:text-[#D4AF37] transition-colors duration-500">
                  {dishe.name}
                </h3>

                <p className="text-[13px] text-gray-400 font-medium leading-relaxed italic line-clamp-2 px-4 mb-8">
                  "{dishe.description}"
                </p>

                <button className="relative inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-white font-black group/btn overflow-hidden transition-all duration-300">
                  <span className="relative z-10 group-hover/btn:text-[#D4AF37]">
                    Détails du plat
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-[#D4AF37] group-hover/btn:translate-x-2 transition-transform duration-500"
                  />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-40 relative z-10 flex justify-center"
      >
        <Link
          to="/user/menu"
          className="relative group flex items-center justify-center px-24 py-7 overflow-hidden rounded-full transition-all duration-700 hover:shadow-[0_0_50px_rgba(212,175,55,0.2)]"
        >
          {/* The Animated Border (The Gradient) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#8B6508] via-[#C25E0A] to-[#8B6508] animate-[shimmer_4s_infinite]" />

          {/* Inner Background (Black to Transparent on hover) */}
          <div className="absolute inset-[1px] bg-black rounded-full group-hover:bg-transparent transition-all duration-500" />

          {/* Text Layer */}
          <span className="relative z-10 text-[#D4AF37] group-hover:text-black font-black text-[11px] tracking-[0.5em] uppercase transition-all duration-500">
            Voir le Menu Complet
          </span>

          {/* Subtle Glow Overlay */}
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
};

export default Section;
