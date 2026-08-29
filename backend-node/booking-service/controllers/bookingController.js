import { createBooking, getAllBookings, updateBookingStatus } from "../services/bookingServices.js";

export const createBokkingController = async (req, res) => {
    const user_id = req.headers["x-user-id"];
    const data = req.body;


    if (!user_id) {
        return res.status(401).json({
            message: "user not authenticated"
        });
    }
    try {
        await createBooking(data, user_id);
        return res.status(201).json({
            message: "booking created successfully"
        });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({
            message: error.message,
            errors: error.errors || null
        });
    }
}

export const getAllBookingsController = async (req, res) => {
    const user_id = req.headers["x-user-id"];
    const role = req.headers["x-user-role"];
    if (!user_id || role !== "1") {
        return res.status(401).json({
            message: "user not authenticated"
        });
    }
    try {
        const bookings = await getAllBookings();
        return res.status(200).json(bookings);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({
            message: error.message,
            errors: error.errors || null
        });
    }
}


export const updateStatusController = async (req, res) => {
    const user_id = req.headers["x-user-id"];
    const role = req.headers["x-user-role"];
    const { status } = req.body;
    const booking_id = req.params.id;
    
    if (!status || !booking_id) {
        return res.status(400).json({
            message: "status and booking id are required"
        });
    }
    if (!user_id || role !== "1") {
        return res.status(401).json({
            message: "user not authenticated"
        });
    }
    try {
        await updateBookingStatus(booking_id, status);
        return res.status(200).json({
            message: "booking status updated successfully"
        });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({
            message: error.message,
            errors: error.errors || null
        });
    }
}