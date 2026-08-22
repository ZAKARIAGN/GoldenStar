import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [msg, setMsg] = useState();
  const [Produits, setProduits] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [refresh, setRefresh] = useState(false);
  return (
    <Context.Provider
      value={{
        msg,
        setMsg,
        Produits,
        setProduits,
        refresh,
        setRefresh,
        orders,
        setOrders,
        reservations,
        setReservations,
      }}
    >
      {children}
    </Context.Provider>
  );
};
