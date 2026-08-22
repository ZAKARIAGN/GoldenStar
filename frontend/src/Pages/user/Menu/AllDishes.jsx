import React, { useEffect, useState, useMemo } from "react";
import { GetAllProducts, SearchProduct } from "../../../Services/ProductService";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, ChevronDown, UtensilsCrossed, Sparkles } from "lucide-react";

const MenuPage = () => {
  const [dishes, setDishes] = useState([]);
  const [searchDishes, setSearchDishes] = useState([]);
  const [tri, setTri] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [query, setQuery] = useState("");
  const [filterCategories, setFilterCategories] = useState("");

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        setLoading(true);
        const data = await GetAllProducts(setErrMsg);
        setDishes(data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDishes();
  }, []);

  const dataSource = query.trim() === "" ? dishes : searchDishes;

  const finalDishes = useMemo(() => {
    let result = [...dataSource];
    if (filterCategories !== "") {
      result = result.filter(
        (dish) =>
          dish.categories?.cat?.replace(/\s+/g, "").toLowerCase() ===
          filterCategories.replace(/\s+/g, "").toLowerCase()
      );
    }

    return result.sort((a, b) => {
      switch (tri) {
        case "name-asc": return a.name.localeCompare(b.name);
        case "name-desc": return b.name.localeCompare(a.name);
        case "price-asc": return a.price - b.price;
        case "price-desc": return b.price - a.price;
        default: return 0;
      }
    });
  }, [dataSource, filterCategories, tri]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() === "") {
      setSearchDishes([]);
      return;
    }
    try {
      setLoading(true);
      const data = await SearchProduct(value, setErrMsg);
      setSearchDishes(data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-20 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 border-b border-white/5 pb-16">
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <Sparkles size={14} className="text-[#D4AF37]" />
              <span className="text-[#D4AF37] text-[10px] font-black tracking-[0.5em] uppercase">Excellence</span>
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-serif text-white">
              Carte des <span className="italic font-light text-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">Saveurs</span>
            </h1>
            <p className="text-gray-400 font-medium max-w-md border-l border-[#D4AF37]/20 pl-6">
              Une sélection rigoureuse des meilleurs produits pour un voyage sensoriel unique.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
            <div className="relative flex-1 md:w-80 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
              <input
                type="text"
                placeholder="Rechercher un plat..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-sm outline-none focus:border-[#D4AF37]/50 transition-all backdrop-blur-md"
                value={query}
                onChange={handleSearch}
              />
            </div>
            <div className="relative">
              <select
                className="appearance-none bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-8 pr-14 text-[10px] font-black tracking-[0.2em] uppercase text-[#D4AF37] outline-none cursor-pointer focus:border-[#D4AF37]/50 backdrop-blur-md"
                onChange={(e) => setTri(e.target.value)}
                value={tri}
              >
                <option value="" className="bg-[#0A0A0A]">Trier par</option>
                <option value="name-asc" className="bg-[#0A0A0A]">Nom A-Z</option>
                <option value="price-asc" className="bg-[#0A0A0A]">Prix Croissant</option>
                <option value="price-desc" className="bg-[#0A0A0A]">Prix Décroissant</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-[#D4AF37] pointer-events-none" size={16} />
            </div>
          </div>
        </div>
      </div>

      <Categories filterCategories={filterCategories} setFilterCategories={setFilterCategories} />

      <div className="max-w-7xl mx-auto px-6 mt-24">
        <AnimatePresence mode="popLayout">
          {loading ? (
            <div className="w-full flex flex-col items-center py-40 gap-6 opacity-80">
               <div className="w-12 h-12 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
               <p className="font-black text-[10px] tracking-[0.5em] uppercase text-[#D4AF37]">Chargement Royal...</p>
            </div>
          ) : finalDishes.length === 0 ? (
            <div className="w-full text-center py-40 bg-white/[0.01] rounded-[3rem] border border-white/5">
              <UtensilsCrossed className="mx-auto text-gray-800 mb-6" size={56} />
              <p className="text-gray-500 font-medium italic text-lg">Aucune création ne correspond à votre demande.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-32">
              {finalDishes.map((dish, index) => {
                const img_url = dish?.img?.startsWith("data:") || dish?.img?.startsWith("http")
                  ? dish.img
                  : `http://localhost:8000/${dish.img}`;

                return (
                  <motion.div
                    layout
                    key={dish.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group flex flex-col items-center"
                  >
                    <div className="relative w-full h-[480px] overflow-hidden rounded-[3rem] shadow-2xl border border-white/5">
                      <div
                        style={{ backgroundImage: `url(${img_url})` }}
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-110"
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                      
                      <span className="absolute top-8 right-8 bg-[#0A0A0A]/90 backdrop-blur-xl text-[#D4AF37] px-6 py-3 rounded-full text-[12px] font-black tracking-widest border border-[#D4AF37]/30 shadow-2xl">
                        {dish.price} DH
                      </span>
                    </div>

                    <div className="relative z-10 -mt-20 w-[90%] bg-[#0A0A0A]/95 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 text-center shadow-[0_30px_60px_rgba(0,0,0,0.5)] group-hover:border-[#D4AF37]/40 transition-all duration-700 group-hover:-translate-y-4">
                      <span className="text-[10px] tracking-[0.5em] uppercase text-[#D4AF37] font-black mb-4 block opacity-80">
                        {dish.categories?.cat || "Chef's Special"}
                      </span>
                      <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-[#D4AF37] transition-colors duration-500">
                        {dish.name}
                      </h3>
                      <p className="text-[13px] text-gray-400 font-medium leading-relaxed italic line-clamp-2 px-2 mb-8">
                        "{dish.description}"
                      </p>
                      
                      <Link
                        to={`/user/showDish/${dish.id}`}
                        className="relative inline-flex items-center justify-center w-full py-5 overflow-hidden rounded-2xl transition-all duration-500 group/btn"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#8B6508] via-[#D4AF37] to-[#8B6508] translate-y-[102%] group-hover/btn:translate-y-0 transition-transform duration-500" />
                        <div className="absolute inset-0 border border-[#D4AF37]/30 rounded-2xl group-hover/btn:border-transparent transition-colors" />
                        <span className="relative z-10 text-[10px] font-black tracking-[0.3em] uppercase text-[#D4AF37] group-hover/btn:text-black transition-colors duration-500">
                          Explorer le plat
                        </span>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Categories = ({ filterCategories, setFilterCategories }) => {
  const categoriesMap = {
    All: "Tous",
    MainDishes: "Plats",
    SideDishes: "Accompagnements",
    Salads: "Salades",
    Desserts: "Desserts",
    Drinks: "Boissons",
    Pizzas: "Pizzas",
  };

  return (
    <div className="flex flex-wrap gap-4 w-full px-6 items-center justify-center relative z-20">
      {Object.keys(categoriesMap).map((cat) => {
        const isActive = (cat === "All" && filterCategories === "") || filterCategories === cat;
        return (
          <button
            key={cat}
            onClick={() => setFilterCategories(cat === "All" ? "" : cat)}
            className={`rounded-full px-10 py-4 transition-all duration-700 text-[10px] font-black tracking-[0.3em] uppercase border ${
              isActive
                ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
                : "bg-white/[0.02] text-gray-500 border-white/5 hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
            }`}
          >
            {categoriesMap[cat]}
          </button>
        );
      })}
    </div>
  );
};

export default MenuPage;