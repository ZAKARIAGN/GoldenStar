import { HandleErr } from "../Components/HAndleErr";
import { ToJson } from "../Components/ToJson";
import Api from "./api";


export const addOrder = async (order,setErr) => {
  try {
    const res = await Api.post("/orders",order);
    return res.data.orders;
  } catch (err) {
    HandleErr(err, setErr);
  }
};

export const getAllOrders = async (setErr) => {
  try {
    const res = await Api.get("/orders");
    return res.data.orders;
  } catch (err) {
    HandleErr(err, setErr);
  }
};



export const getOrderByUser = async  (setErr) => {
  try{
    const res = await Api.get("/ordersByUser");
    return res.data.orders;
  }catch(err){
    HandleErr(err,setErr);
  }
}

export const searchOrder = async (query, setErr) => {
  try {
    if (!query.trim()) return []; 

    const res = await Api.get(`/orders/search?q=${query}`);
    return res.data.orders || [];
  } catch (err) {
    HandleErr(err, setErr);
    return [];
  }
};



export const updateStatus = async (orderID, newStatus, setErr) => {
  try {
    const res = await Api.patch(`/orders/${orderID}/status`, {
      status: newStatus,
    });
    return res.data.order;
  } catch (err) {
    HandleErr(err, setErr);
  }
};
