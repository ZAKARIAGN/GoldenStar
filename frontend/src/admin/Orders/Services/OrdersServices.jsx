import Api from "../../../Services/api";

export const getAllOrders = async () => {
    try {
        const response = await Api.get(`/order/get-all-orders`)
        return response.data
    } catch (error) {
        return error.message
    }
} 


export const updateOrderStatus = async (orderId, {status, newStatus}) => {
    try {
        const response = await Api.patch(`/order/update-order-status/${orderId}`, { status, newStatus })
        return response.data
    } catch (error) {
        return error.message
    }
}