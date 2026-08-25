import db from "../config/db.js";

export const addOrder = async (data, userId) => {
    const { phone, address, payment_method, note, ordered } = data;
    const errors = {}
    let parsedOrdered;
    try {
        parsedOrdered =
            typeof ordered === "string"
                ? JSON.parse(ordered)
                : ordered;
    } catch (error) {
        errors.ordered = "Invalid ordered format";
    }


    if (!phone || phone.trim() === "") {
        errors.phone = "Phone number is required";
    }
    if (!address || address.trim() === "") {
        errors.address = "Address is required";
    }
    if (!payment_method || payment_method.trim() === "") {
        errors.payment_method = "Payment method is required";
    }

    if (!Array.isArray(parsedOrdered) || parsedOrdered.length === 0) {
        errors.ordered = "Ordered items are required";
    }

    if (Array.isArray(parsedOrdered)) {
        for (const orderItem of parsedOrdered) {
            if (!["item", "combo"].includes(orderItem.type)) {
                errors.ordered = "Invalid order item type";
                break;
            }

            if (
                !orderItem.id ||
                !Number.isInteger(Number(orderItem.id)) ||
                Number(orderItem.id) <= 0
            ) {
                errors.ordered = "Invalid item/combo ID";
                break;
            }

            if (
                !Number.isInteger(Number(orderItem.quantity)) ||
                Number(orderItem.quantity) <= 0
            ) {
                errors.ordered = "Invalid quantity";
                break;
            }

            if (
                orderItem.price === undefined ||
                orderItem.price === null ||
                isNaN(Number(orderItem.price)) ||
                Number(orderItem.price) < 0
            ) {
                errors.ordered = "Invalid price";
                break;
            }
        }
    }

    if (Object.keys(errors).length > 0) {
        const error = new Error("Validation failed");
        error.statusCode = 400;
        error.errors = errors;
        throw error;
    }

    let totalPrice = 0;

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        for (const item of parsedOrdered) {
            totalPrice += Number(item.price) * Number(item.quantity);
        }
        totalPrice = Number(totalPrice.toFixed(2));



        const ref = "OR" + Math.floor(1000000 + Math.random() * 9000000);
        const [order] = await connection.query(
            "insert into orders (ref,user_id,phone,address,total_price,payment_method,note) values (?,?,?,?,?,?,?)",
            [ref, userId, phone, address, totalPrice, payment_method, note || null]
        );
        const orderId = order.insertId;


        for (const item of parsedOrdered) {
            if (item.type === "combo") {
                const [comboOrder] = await connection.query(
                    "insert into order_items (order_id,combo_id,quantity,unit_price,total_price,type) values (?,?,?,?,?,'combo')",
                    [orderId, item.id, item.quantity, item.price, Number(item.price) * Number(item.quantity)]
                )
            } else if (item.type === "item") {
                const [itemOrder] = await connection.query(
                    "insert into order_items (order_id,item_id,quantity,unit_price,total_price,type) values (?,?,?,?,?,'item')",
                    [orderId, item.id, item.quantity, item.price, Number(item.price) * Number(item.quantity)]
                )
            } else {
                errors.ordered = "Invalid order item type";
                break;
            }
        }


        await connection.commit();

        return {
            message: "Order added successfully",
        }

    } catch (error) {
        if (connection) {
            await connection.rollback();
        }

        console.error("[addOrder] DB Error:", error.message, error.code);

        if (error.statusCode) {
            throw error;
        }

        const dbError = new Error("Failed to add order");
        dbError.statusCode = 500;
        dbError.detail = error.message;
        throw dbError;
    }
}