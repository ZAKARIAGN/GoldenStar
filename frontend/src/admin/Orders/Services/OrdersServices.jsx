import Api from "../../../Services/api";

export const getAllOrders = async () => {
    try {
        const response = await Api.get(`/order/get-all-orders`)
        return response.data
    } catch (error) {
        return error.message
    }
} 