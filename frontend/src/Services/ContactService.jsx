import { toast } from "react-toastify";
import Api from "./api";
import { HandleErr } from "../Components/HAndleErr";

export const AddContact = async (contactForm, setErr) => {
  try {
    const res = await Api.post("/contact", contactForm);
    toast.success(res.data.message || "message added successful!", {
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