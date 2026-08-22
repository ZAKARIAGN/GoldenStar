import db from "../config/db.js"
import axios from "axios"

export const addCombo = async (data, images) => {
    const { name, description, price, items } = data;
    const parsedItems = typeof items === "string" ? JSON.parse(items) : items;
    const image = images?.path;
    const errors = {}

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

    if (!parsedItems || parsedItems.length === 0) {
        errors.items = "The items are required";
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


    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();


        const [combo] = await connection.query("insert into combos (name,description,price,image) values (?,?,?,?)", [name, description, Number(price), image]);

        const comboId = combo.insertId;

        for (const item of parsedItems) {
            await connection.query("insert into combo_items (combo_id,item_id,quantity) values (?,?,?)", [comboId, item.item_id, item.quantity]);
        }

        await connection.commit();

        return;


    } catch (error) {
        if (connection) {
            await connection.rollback();
        }

        if (error.statusCode) {
            throw error;
        }

        const dbError = new Error("Failed to add combo");
        dbError.statusCode = 500;
        throw dbError;

    }
}



export const updateCombo = async (Id, data, images) => {
    const { name, description, price, items } = data;
    const parsedItems = typeof items === "string" ? JSON.parse(items) : items;
    const image = images?.path;
    const errors = {};

    const [combo] = await db.query("select * from combos where id = ?", [Id]);

    if (combo.length === 0) {
        const error = new Error("Combo not found");
        error.statusCode = 404;
        throw error;
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

    if (!parsedItems || parsedItems.length === 0) {
        errors.items = "The items are required";
    }

    if (Object.keys(errors).length > 0) {
        const error = new Error("Validation failed");
        error.statusCode = 400;
        error.errors = errors;
        throw error;
    }


    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        if (image) {
            await connection.query("update combos set name = ?, description = ?, price = ?, image = ? where id = ?", [name, description, Number(price), image, Id]);
        } else {
            await connection.query("update combos set name = ?, description = ?, price = ? where id = ?", [name, description, Number(price), Id]);
        }

        await connection.query("delete from combo_items where combo_id = ?", [Id]);

        for (const item of parsedItems) {
            await connection.query("insert into combo_items (combo_id,item_id,quantity) values (?,?,?)", [Id, item.item_id, item.quantity]);
        }

        await connection.commit();

        return;


    } catch (error) {
        if (connection) {
            await connection.rollback();
        }

        if (error.statusCode) {
            throw error;
        }

        const dbError = new Error("Failed to update combo");
        dbError.statusCode = 500;
        throw dbError;

    }
}

export const deleteComboService = async (Id) => {
    const [combo] = await db.query("select * from combos where id = ?", [Id]);

    if (combo.length === 0) {
        const error = new Error("Combo not found");
        error.statusCode = 404;
        throw error;
    }

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();
        await connection.query("delete from combo_items where combo_id = ?", [Id]);
        await connection.query("delete from combos where id = ?", [Id]);
        await connection.commit();
    } catch (error) {
        if (connection) {
            await connection.rollback();
        }
        const dbError = new Error("Failed to delete combo");
        dbError.statusCode = 500;
        throw dbError;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}



export const getAllMenuItems = async (userId) => {
    const response = await axios.get(
        "http://menu-service:5002/menu/get-all-items",
        {
            headers: {
                "x-user-id": userId
            }
        }
    );

    return response.data.data;
};



export const getAllcombos = async (userId) => {
    try {
        const [combos] = await db.query(`
            SELECT 
                c.id,
                c.name,
                c.description,
                c.price,
                c.image,
                c.status,
                ci.item_id,
                ci.quantity
            FROM combos c
            LEFT JOIN combo_items ci ON c.id = ci.combo_id
        `);

        const items = await getAllMenuItems(userId);
        const comboMap = new Map();
        for (const combo of combos) {
            if (!comboMap.has(combo.id)) {
                comboMap.set(combo.id, {
                    id: combo.id,
                    name: combo.name,
                    description: combo.description,
                    price: combo.price,
                    image: combo.image,
                    status: combo.status,
                    items: []
                })
            }


            if (combo.item_id !== null) {
                const item = items.find(i => i.id === combo.item_id)
                if (item) {
                    comboMap.get(combo.id).items.push({
                        item_id: combo.item_id,
                        quantity: combo.quantity,
                        name: item.name,
                        price: item.price,
                        imageUrl: item.image_path
                    })
                }
            }
        }

        return Array.from(comboMap.values());
    } catch (error) {
        if (error.response) {
            throw error;
        }
        const dbError = new Error("Failed to get combos");
        dbError.statusCode = 500;
        throw dbError;
    }
}