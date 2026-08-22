import { HandleErr } from "../Components/HAndleErr";
import Api from "./api";

export const addReservation = async (reservation,setErr,navigate) => {
  try {
    const res = await Api.post("/reservation",reservation);
    navigate("/user/home")
    return res.data.reservations;
  } catch (e) {
    HandleErr(e, setErr);
  }
};

export const getAllReservations = async (setErr) => {
  try {
    const res = await Api.get("/reservation");
    return res.data.reservations;
  } catch (e) {
    HandleErr(e, setErr);
  }
};

export const getReservationsByUser = async (setErr) => {
  try {
    const res = await Api.get("/reservation-history");
    return res.data.reservations;
  } catch (e) {
    HandleErr(e, setErr);
  }
};

export const searchReservation = async (query, setErr) => {
  try {
    if (!query.trim()) return [];

    const res = await Api.get(`/reservation/search/?q=${query}`);

    return res.data.reservations;
  } catch (err) {
    HandleErr(err, setErr);
    return [];
  }
};

export const updateStatus = async (resID, newStatus, setErr) => {
  try {
    const res = await Api.patch(`/reservation/${resID}/status`, {
      status: newStatus,
    });
    return res.data.reservation;
  } catch (err) {
    HandleErr(err, setErr);
  }
};
