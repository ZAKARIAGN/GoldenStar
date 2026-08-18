import express from "express";
const router = express.Router();
import { addReviewController } from "../controllers/ReviewController.js";

router.post("/add-review/:id", addReviewController);

export default router;