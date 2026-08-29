import db from "../config/db.js";
import axios from "axios";


export const getItemById = async (id, userId) => {
    const response = await axios.get(
        `http://menu-service:5002/menu/get-item/${id}`,
        { headers: { "x-user-id": userId } }
    );
    return response.data;
}

export const getComboById = async (id, userId) => {
    const response = await axios.get(
        `http://combo-service:5003/combo/get-combo/${id}`,
        { headers: { "x-user-id": userId } }
    );
    return response.data;
}

export const getUserById = async (id) => {
    const response = await axios.get(
        `http://auth-service:5001/auth/get-user/${id}`
    );
    return response.data;
}


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


        for (const orderItem of parsedOrdered) {
            let itemPrice;
            if (orderItem.type === "combo") {
                const combo = await getComboById(orderItem.id, userId);
                itemPrice = combo.price;
            } else if (orderItem.type === "item") {
                const itemData = await getItemById(orderItem.id, userId);
                itemPrice = itemData.price;
            }
            totalPrice += Number(itemPrice) * Number(orderItem.quantity);
        }
        totalPrice = Number(totalPrice.toFixed(2));



        const ref = "OR" + Math.floor(1000000 + Math.random() * 9000000);
        const [order] = await connection.query(
            "insert into orders (ref,user_id,phone,address,total_price,payment_method,note) values (?,?,?,?,?,?,?)",
            [ref, userId, phone, address, totalPrice, payment_method, note || null]
        );
        const orderId = order.insertId;


        for (const orderItem of parsedOrdered) {
            if (orderItem.type === "combo") {
                const comboData = await getComboById(orderItem.id, userId);
                const [comboOrder] = await connection.query(
                    "insert into order_items (order_id,combo_id,quantity,unit_price,total_price,type) values (?,?,?,?,?,'combo')",
                    [orderId, orderItem.id, orderItem.quantity, comboData.price, Number(comboData.price) * Number(orderItem.quantity)]
                )
            } else if (orderItem.type === "item") {
                const itemData = await getItemById(orderItem.id, userId);
                const [itemOrder] = await connection.query(
                    "insert into order_items (order_id,item_id,quantity,unit_price,total_price,type) values (?,?,?,?,?,'item')",
                    [orderId, orderItem.id, orderItem.quantity, itemData.price, Number(itemData.price) * Number(orderItem.quantity)]
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


export const getAllCombos = async (userId) => {
    const response = await axios.get(
        "http://combo-service:5003/combo/get-all-combos",
        {
            headers: {
                "x-user-id": userId
            }
        }
    );

    return response.data;
};


export const getAllOrders = async (userId) => {
    try {
        const [orders] = await db.query(
            `SELECT 
                o.id as order_id, o.ref, o.user_id, o.phone, o.address,o.status,
                o.total_price as order_total_price, o.payment_method, o.note,
                o.created_at, o.updated_at,
                oi.id as order_item_id, oi.item_id, oi.combo_id, oi.quantity,
                oi.unit_price, oi.total_price as item_total_price, oi.type
            FROM orders o
            INNER JOIN order_items oi ON o.id = oi.order_id
            ORDER BY o.created_at DESC`
        )
        const combos = await getAllCombos(userId);
        const items = await getAllMenuItems(userId);

        const orderMap = new Map();

        for (const order of orders) {
            if (!orderMap.has(order.order_id)) {
                let user_name = null;
                try {
                    const user = await getUserById(order.user_id);
                    user_name = `${user.f_name} ${user.l_name}`;
                } catch (_) {
                    user_name = null;
                }

                orderMap.set(order.order_id, {
                    id: order.order_id,
                    ref: order.ref,
                    user_id: order.user_id,
                    name:user_name,
                    phone: order.phone,
                    address: order.address,
                    total_price: order.order_total_price,
                    payment_method: order.payment_method,
                    note: order.note,
                    status: order.status,
                    created_at: order.created_at,
                    updated_at: order.updated_at,
                    items: []
                })
            }

            if (order.item_id !== null) {
                const item = items.find((item) => item.id === order.item_id);
                if (item) {
                    orderMap.get(order.order_id).items.push({
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        price: item.price,
                        image: item.image_path,
                        quantity: order.quantity,
                        total_price: order.item_total_price,
                        type: order.type

                    })
                }

            } else if (order.combo_id !== null) {
                const combo = combos.find((combo) => combo.id === order.combo_id);
                if (combo) {
                    orderMap.get(order.order_id).items.push({
                        id: combo.id,
                        name: combo.name,
                        description: combo.description,
                        price: combo.price,
                        image: combo.image,
                        items: combo.items,
                        quantity: order.quantity,
                        total_price: order.item_total_price,
                        type: order.type
                    })
                }
            }
        }

        return Array.from(orderMap.values());


    } catch (error) {
        console.error("getAllOrders failed inside ordersServices.js:", error);
        if (error.statusCode) {
            throw error;
        }

        const dbError = new Error("Failed to get all orders");
        dbError.statusCode = 500;
        dbError.detail = error.message;
        throw dbError;
    }
}



export const updateOrderStatus = async (orderId,newStatus) => {
    const errors={}
    if(!orderId){
        errors.orderId="Please provide an orderId";
    }
    if(!newStatus){
        errors.status="Please provide a new status";
    }

    const validStatuses = ["pending", "confirmed", "preparing", "ready", "delivered", "cancelled"];

    if (!validStatuses.includes(newStatus.toLowerCase())) {
        errors.status = "Invalid status. Please use one of the following: " + validStatuses.join(", ");
    }
    if(Object.keys(errors).length>0){
        const error = new Error("Validation error");
        error.statusCode = 400;
        error.errors = errors;
        throw error;
    }
    try{
        const [result] = await db.query(
            "update orders set status=? where id=?",
            [newStatus,orderId]
        )
        if(result.affectedRows===0){
            const error = new Error("Order not found");
            error.statusCode = 404;
            throw error;
        }
        return {
            message:"Order updated successfully",
        }
    }catch(error){
        console.error("updateOrderStatus failed inside ordersServices.js:",error);
        if(error.statusCode){
            throw error;
        }

        const dbError = new Error("Failed to update order");
        dbError.statusCode = 500;
        dbError.detail = error.message;
        throw dbError;
    }
}