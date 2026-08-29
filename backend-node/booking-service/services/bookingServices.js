import db from "../config/db.js";

export const createBooking = (data, user_id) => {
    const { phone, booking_date, num_person } = data;
    const errors = {}

    if (!phone || String(phone).trim() === "") {
        errors.phone = "phone is required";
    }

    if (!booking_date || String(booking_date).trim() === "") {
        errors.booking_date = "booking date is required";
    }

    if (new Date(booking_date) < Date.now()) {
        errors.booking_date = "booking date must be in the future";
    }

    if (!num_person || String(num_person).trim() === "") {
        errors.num_person = "number of persons is required";
    }

    if (Object.keys(errors).length > 0) {
        const error = new Error("Validation failed");
        error.statusCode = 400;
        error.errors = errors;
        throw error;
    }

    try {
        const ref = "book" + Date.now();
        db.query(
            "insert into bookings(user_id,phone,booking_date,num_person,ref) values (?,?,?,?,?)",
            [user_id, phone, booking_date, num_person, ref]
        )
    } catch (error) {
        if (error.statusCode) {
            throw error;
        }

        const dbError = new Error("Failed to create booking");
        dbError.statusCode = 500;
        throw dbError;
    }
}



export const getAllBookings = () => {
    try {
        const [bookings] = db.query(
            "select * from bookings"
        )

        return bookings;
    } catch (error) {
        const error1 = new Error("Failed to fetch bookings");
        error1.statusCode = 500;
        throw error1;
    }
}


export const updateBookingStatus = (BookingId,status) => {
    try {
        db.query(
            "update bookings set status = ? where id = ?",
            [status, BookingId]
        )
    } catch (error) {
        if (error.statusCode) {
            throw error;
        }

        const dbError = new Error("Failed to update booking status");
        dbError.statusCode = 500;
        throw dbError;
    }
}