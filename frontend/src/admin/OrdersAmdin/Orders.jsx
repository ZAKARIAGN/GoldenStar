import React, { useState } from "react";
import HeaderOrders from "./HeaderOrders";
import OrderTable from "./OrderTable";
import ShowOrder from "./ShowOrder";

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrder, setShowOrder] = useState(false);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrder(true);
  };

  return (
    <div className="min-h-full relative animate-in fade-in slide-in-from-bottom-4 duration-1000">
      

      <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-[#D4AF37]/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="relative z-10">

        <HeaderOrders />


        <div className="mt-4">
          <OrderTable view={handleViewOrder} />
        </div>
      </div>


      {showOrder && selectedOrder && (
        <ShowOrder 
          order={selectedOrder} 
          onClose={() => setShowOrder(false)} 
        />
      )}

      <div className="mt-20 pb-10 flex items-center justify-center gap-4 opacity-20">
        <div className="h-[1px] w-12 bg-[#D4AF37]" />
        <span className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] font-black">
          L'Étoile d'Or • Système de Gestion
        </span>
        <div className="h-[1px] w-12 bg-[#D4AF37]" />
      </div>
    </div>
  );
};

export default Orders;