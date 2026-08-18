import db from "../config/db.js";


export const getAllItems = async () => {
    try {
        const [result] = await db.query("select items.*, count(reviews.id) as total_review, round(avg(reviews.rating),1) as avg_rating from items left join reviews on items.id = reviews.item_id group by items.id");

        return result;
    } catch (error) {
        const dbError = new Error("Failed to get menu items");
        dbError.statusCode = 500;
        throw dbError;
    }
}


export const getItemById = async (id) => {
    try {
        const [result] = await db.query("select * from items where id = ?", [id])

        if (result.length === 0) {
            const error = new Error("Item not found");
            error.statusCode = 404;
            throw error;
        }
        return result[0];
    } catch (error) {
        if (error.statusCode) {
            throw error;
        }
        const dbError = new Error("Failed to get menu item");
        dbError.statusCode = 500;
        throw dbError;
    }
}




export const addItem = async (data, uploadedImage, userId) => {
    const { name, description, price, category } = data;

    const image = uploadedImage ? uploadedImage.path : data.image;

    const errors = {}

    if (!name || name.trim() === "") {
        errors.name = "The name is required"
    }

    if (!description || description.trim() === "") {
        errors.description = "The description is required"
    }

    if (price === undefined || price === null || price === "") {
        errors.price = "The price is required"
    }

    if (price === undefined || price === null || price === "") {
        errors.price = "The price is required";
    } else if (Number.isNaN(Number(price))) {
        errors.price = "The price must be a valid number";
    } else if (Number(price) <= 0) {
        errors.price = "The price must be greater than zero";
    }

    if (!category || category.trim() === "") {
        errors.category = "The category is required"
    }

    if (!image || image.trim() === "") {
        errors.image = "The image is required"
    }

    if (Object.keys(errors).length > 0) {
        const error = new Error("Validation failed");
        error.statusCode = 400;
        error.errors = errors;
        throw error;
    }

    try {
        const [result] = await db.query(
            `INSERT INTO items
            (user_id, name, description, price, category, image_path)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                userId,
                name,
                description,
                price,
                category,
                image
            ]
        );

        return result;

    } catch (error) {
        if (error.statusCode) {
            throw error;
        }

        const dbError = new Error("Failed to create menu item");
        dbError.statusCode = 500;
        throw dbError;
    }
};








export const updateItem = async (id, data, uploadedImage) => {
    const { name, description, price, category } = data;
    const image = uploadedImage ? uploadedImage.path : data.image;
    const errors = {};

    if (!id || id.trim() === "") {
        errors.id = "The id is required";
    }

    if (!name || name.trim() === "") {
        errors.name = "The name is required";
    }

    if (!description || description.trim() === "") {
        errors.description = "The description is required";
    }

    if (price === undefined || price === null || price === "") {
        errors.price = "The price is required";
    } else if (Number.isNaN(Number(price))) {
        errors.price = "The price must be a valid number";
    } else if (Number(price) <= 0) {
        errors.price = "The price must be greater than zero";
    }

    if (!category || category.trim() === "") {
        errors.category = "The category is required";
    }

    if (!image || image.trim() === "") {
        errors.image = "The image is required";
    }

    if (Object.keys(errors).length > 0) {
        const error = new Error("Validation failed");
        error.statusCode = 400;
        error.errors = errors;
        throw error;
    }

    const [rows] = await db.query("SELECT id FROM items WHERE id = ?", [id]);

    if (rows.length === 0) {
        const error = new Error("Item not found");
        error.statusCode = 404;
        throw error;
    }

    try {
        const [result] = await db.query(
            `UPDATE items 
            SET name = ?, description = ?, price = ?, category = ?, image_path = ?
            WHERE id = ?`,
            [
                name,
                description,
                price,
                category,
                image,
                id
            ]
        );

        return result;
    } catch (error) {
        if (error.statusCode) {
            throw error;
        }

        const dbError = new Error("Failed to update menu item");
        dbError.statusCode = 500;
        throw dbError;
    }

}





export const deleteItem = async (id) => {
    try {
        const [result] = await db.query("delete from items where id = ?", [id])
        return result;
    } catch (error) {
        const dbError = new Error("Failed to delete menu item");
        dbError.statusCode = 500;
        throw dbError;
    }
}