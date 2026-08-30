import Api from "../../../Services/api"

export const getAllBookings = async () => {
    const response = await Api.get('/bookings/get-all-bookings')
    return response.data

}

    