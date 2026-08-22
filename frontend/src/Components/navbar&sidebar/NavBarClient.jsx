import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ShoppingBag, Search, Crown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Dropdown from "../DropDown";
import SideBarClientResponsive from "./SideBarClientResponsive";
import { GetAllItems } from "../../Services/CartService";
import { CartDrawer } from "../CartDrawer";

const NavBarClient = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await GetAllItems();
        setItems(data.items || []);
        setTotal(data.total);
      } catch {
        console.error("Cart error");
      }
    };
    fetchItems();
  }, [items]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navBar = [
    { name: "ACCUEIL", path: "/user/home" },
    { name: "NOTRE MENU", path: "/user/menu" },
    { name: "RÉSERVATION", path: "/user/reservation" },
    { name: "NOTRE HISTOIRE", path: "/user/about" },
    { name: "CONTACT", path: "/user/contact" },
  ];

  const DropItems = [
    { name: "Mon Profil", path: "user/profil" },
    { name: "Mes Commandes", path: "/user/my-orders" },
    { name: "Mes Réservations", path: "/user/reservation-history" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-700 ${scrolled
            ? "py-3 bg-black/80 backdrop-blur-2xl border-b border-[#D4AF37]/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            : "py-6 bg-transparent"
          }`}
      >
        <div className="max-w-[1400px] mx-auto flex justify-between items-center px-8">

          <button
            className="md:hidden p-2 text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-full transition-all"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={24} />
          </button>

          <Link to="/user/home" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/logo.png"
                alt="L'Étoile d'Or"
                className="w-10 h-10 md:w-12 md:h-12 object-contain group-hover:scale-110 transition-transform duration-500 brightness-110"
              />
              <div className="absolute -top-1 -right-1">
                <Crown size={12} className="text-[#D4AF37] animate-pulse" />
              </div>
            </div>
            <span className="hidden sm:block font-serif font-black tracking-[0.15em] text-xl text-white">
              L'ÉTOILE <span className="text-[#D4AF37] italic font-light drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">D'OR</span>
            </span>
          </Link>
          <nav className="hidden md:flex gap-5 items-center">
            {navBar.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={index}
                  to={item.path}
                  className="relative group py-2"
                >
                  <span className={`text-[10px] font-black tracking-[0.3em] transition-all duration-500 uppercase ${isActive ? "text-[#D4AF37]" : "text-gray-400 group-hover:text-white"
                    }`}>
                    {item.name}
                  </span>


                  <span className={`absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transition-all duration-500 ${isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-50"
                    }`} />

                  {isActive && (
                    <motion.div
                      layoutId="nav-dot"
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#D4AF37] rounded-full shadow-[0_0_5px_#D4AF37]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>


          <div className="flex gap-4 md:gap-8 items-center">


            <button className="hidden sm:block p-2 text-gray-400 hover:text-[#D4AF37] transition-all transform hover:scale-110">
              <Search size={20} />
            </button>


            <div
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 cursor-pointer group"
            >
              <ShoppingBag size={22} className="text-white group-hover:text-[#D4AF37] transition-colors" />
              <AnimatePresence>
                {items.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-gradient-to-br from-[#D4AF37] to-[#8B6508] text-black text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)] border border-black"
                  >
                    {items.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden md:block">
              <Dropdown DropItems={DropItems} />
            </div>

            <Link
              to="/user/reservation"
              className="hidden lg:block relative group p-[1px] overflow-hidden rounded-full transition-all duration-700 shadow-[0_0_15px_rgba(212,175,55,0.05)] hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#8B6508] via-[#C25E0A] to-[#8B6508] animate-[shimmer_4s_infinite]" />

              <div className="relative bg-black rounded-full py-3 px-10 group-hover:bg-transparent transition-all duration-500">
                <span className="relative z-10 text-[#D4AF37] group-hover:text-black font-black text-[9px] tracking-[0.4em] uppercase transition-colors whitespace-nowrap">
                  Réserver
                </span>
              </div>
            </Link>
          </div>
        </div>
      </motion.header>
      <SideBarClientResponsive
        isOpen={isOpen}
        navBar={navBar}
        toggleMenu={() => setIsOpen(false)}
        currentPath={location.pathname}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items}
        total={total}
      />
    </>
  );
};

export default NavBarClient;