import { toast } from "react-toastify";
import { HandleErr } from "../Components/HAndleErr";
import { ToJson } from "../Components/ToJson";
import Api from "./api";

export const GetAllProducts = async (setErr) => {
  try {
    const res = await Api.get("/products");
    return res.data.products;
  } catch (err) {
    HandleErr(err, setErr);
  }
};

export const AddProduct = async (product, setErr, onClose) => {
  try {
    const res = await Api.post("/products", product);
    toast.success(res.data.message || "Registration successful!", {
      style: {
        width: "400px",
        height: "100px",
        fontSize: "16px",
      },
    });

    onClose();
  } catch (err) {
    HandleErr(err, setErr);
  }
};



export const DeleteProduct = async (productID,setErr)=>{
  try{
    const res = await Api.delete(`/products/${productID}`) 
    toast.success(res.data.message, {
      style: {
        width: "400px",
        height: "100px",
        fontSize: "16px",
      },
    });
  }catch(err){
    HandleErr(err,setErr)
  }
}


export const UpdateProduct = async (product, setErr, onClose) => {
  try {
    const res = await Api.put(`/products/${product.id}`, product);
    toast.success(res.data.message || "Updating successful!", {
      style: {
        width: "400px",
        height: "100px",
        fontSize: "16px",
      },
    });

    onClose();
  } catch (err) {
    HandleErr(err, setErr);
  }
};


export const SearchProduct = async(query,setErr)=>{
  try{
    const res = await Api.get(`/products/search?q=${query}`);
    return res.data.products
    }catch(err){
      HandleErr(err,setErr)
    }
}


export const GetProductById = async (setErr,DishId) => {
  try {
    const res = await Api.get(`/products/${DishId}`);
    return res.data.product;
  } catch (err) {
    HandleErr(err, setErr);
  }
};
