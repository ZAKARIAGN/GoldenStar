import { toast } from "react-toastify";
import Api from "./api";
import { HandleErr } from "../Components/HAndleErr";



export const GetAllItems = async (setErr) => {
  try {
    const res = await Api.get("/cart");
    return res.data;
  } catch (err) {
    HandleErr(err, setErr);
  }
};

export const AddCart = async (cartData, setErr) => {
  try {
    const res = await Api.post("/cart", cartData);
    toast.success(res.data.message || "product added successful!", {
      style: {
        width: "400px",
        height: "100px",
        fontSize: "16px",
      },
    });
  } catch (err) {
    HandleErr(err, setErr);
  }
};


export const AddQtte = async (cartDataID, setErr) => {
  try {
    const response = await Api.put(`/addQtte/${cartDataID}`);
    return response.data;
  } catch (err) {
    HandleErr(err, setErr);
    return null;
  }
};

export const MinseQtte = async (cartDataID, setErr) => {
  try {
    const response = await Api.put(`/minseQtte/${cartDataID}`);
    return response.data;
  } catch (err) {
    HandleErr(err, setErr);
    return null;
  }
};


export const DeleteItem = async (cartDataID, setErr) => {
  try {
    const response = await Api.delete(`/cart/${cartDataID}`);
    return response.data;
  } catch (err) {
    HandleErr(err, setErr);
    return null;
  }
};



