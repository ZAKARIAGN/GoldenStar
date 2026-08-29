import express from "express";
import { createBokkingController, getAllBookingsController, updateStatusController } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/add-booking", createBokkingController);
router.get("/get-all-bookings", getAllBookingsController);
router.patch("/update-status/:id", updateStatusController);

export default router
