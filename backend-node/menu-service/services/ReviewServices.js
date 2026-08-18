import db from "../config/db.js";

export const addReview = async (data, user_id, item_id) => {
    const { rating } = data;
    const errors = {};

    if (!rating) {
        errors.rating = "The rating is required";
    }

    if (rating) {
        if (rating <= 0 || rating > 5) {
            errors.rating = "The rating must be between 1 and 5";
        }
    }

    if (Object.keys(errors).length > 0) {
        const error = new Error("Validation failed");
        error.statusCode = 400;
        error.errors = errors;
        throw error;
    }

    try {
        const [result] = await db.query(
            "insert into reviews (user_id, item_id, rating) values (?,?,?)",
            [user_id, item_id, rating]
        )
        return result;
    } catch (error) {
        if (error.statusCode) {
            throw error;
        }
        const dbError = new Error("Failed to add review");
        dbError.statusCode = 500;
        throw dbError;
    }
}