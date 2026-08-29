import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/bookings", bookingRoutes);

app.listen(5005, () => {
    console.log("Booking service is running on port 5005");
})

export default app;