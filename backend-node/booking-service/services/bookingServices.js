import db from "../config/db.js";

export const createBooking = async (data, user_id) => {
    const { phone, booking_date, num_person } = data;
    const errors = {}

    if (!phone || String(phone).trim() === "") {
        errors.phone = "phone is required";
    }



    if (!booking_date || String(booking_date).trim() === "") {
        errors.booking_date = "booking date is required";
    } else if (new Date(booking_date) < Date.now()) {
        errors.booking_date = "booking date must be in the future";
    }



    if (num_person === undefined || num_person === null || String(num_person).trim() === "") {
        errors.num_person = "number of persons is required";
    } else if (!Number.isInteger(Number(num_person)) || Number(num_person) <= 0) {
        errors.num_person = "number of persons must be a positive integer";
    }

    if (Object.keys(errors).length > 0) {
        const error = new Error("Validation failed");
        error.statusCode = 422;
        error.errors = errors;
        throw error;
    }

    try {
        const ref = "BOOK-" + Date.now();

        const [tables] = await db.query("select * from restaurant_tables where capacity >= ? and status = 'available' order by capacity", [num_person])
        if (tables.length === 0) {
            const error = new Error("No table available");
            error.statusCode = 422;
            error.errors = {
                num_person: "no table available for this number of persons"
            };
            throw error;
        }



        let tableId = null
        for (const table of tables) {
            const [existingBooking] = await db.query(
                `
        SELECT id
        FROM bookings
        WHERE table_id = ?
        AND booking_date = ?
        AND status != 'cancelled'
        `,
                [table.id, booking_date]
            );

            if (existingBooking.length === 0) {
                tableId = table.id;
                break;
            }
        }

        if (!tableId) {
            const error = new Error("No table available");
            error.statusCode = 422;
            error.errors = {
                num_person: "No table available for this number of persons at this time"
            };
            throw error;
        }




        await db.query(
            "insert into bookings(user_id,phone,booking_date,num_person,ref,table_id) values (?,?,?,?,?,?)",
            [user_id, phone, booking_date, num_person, ref, tableId]
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



export const getAllBookings = async () => {
    try {
        const [bookings] = await db.query(
            "select * from bookings"
        )

        return bookings;
    } catch (error) {
        if(error.statusCode){
            throw error;
        }
        const dbError = new Error("Failed to fetch bookings");
        dbError.statusCode = 500;
        throw dbError;
    }
}


export const updateBookingStatus = async (BookingId, status) => {
    try {
        await db.query(
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