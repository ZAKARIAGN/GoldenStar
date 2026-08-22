import React, { useState } from "react";
import ShowOrder from "../../admin/OrdersAmdin/ShowOrder";
import MyOrdersTable from "./MyOrdersTable";
import MyHeaderOrders from "./MyHeaderOrders";
import { motion, AnimatePresence } from "framer-motion";

const MyOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrder, setShowOrder] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden text-white">
      {/* Cinematic Background Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[150px] -z-10 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-[1600px] mx-auto p-6 md:p-12 relative z-10">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <MyHeaderOrders />
        </motion.div>

        {/* Table Section with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/[0.02] backdrop-blur-xl rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden"
        >
          <MyOrdersTable
            view={(order) => {
              setSelectedOrder(order);
              setShowOrder(true);
            }}
          />
        </motion.div>
      </div>

      {/* Modern Overlaid Modal */}
      <AnimatePresence>
        {showOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-[3rem] shadow-[0_0_50px_rgba(212,175,55,0.1)] custom-scrollbar"
            >
              <ShowOrder 
                order={selectedOrder} 
                onClose={() => setShowOrder(false)} 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyOrders;