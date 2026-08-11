import express from "express";
const router = express.Router();
import { addItemController } from "../controllers/MenuControllers.js";
import upload from "../middleware/uploadMiddleware.js";

router.post("/add-item", upload.single("image"), addItemController);

export default router;
