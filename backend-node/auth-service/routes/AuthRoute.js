import express from "express";
import { RegisterController, LoginController, GetUserController } from "../controllers/AuthController.js";
const router = express.Router();



router.post("/register", RegisterController);
router.post("/login", LoginController);
router.get("/get-user/:id", GetUserController);


export default router;
