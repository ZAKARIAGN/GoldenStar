import dotenv from "dotenv";
dotenv.config();

import express from "express";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

app.use(express.json());
app.use("/order", orderRoutes);

app.listen(5004, () => {
    console.log("Order Service running on port 5004");
});