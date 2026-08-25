import express from "express";
import { addOrderController } from "../controllers/ordersController.js";
const router = express.Router();

router.post("/add-order", addOrderController);

export default router;
