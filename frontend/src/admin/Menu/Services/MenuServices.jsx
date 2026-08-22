import Api from "../../../Services/api"

export const getAllItems = async () => {
    const res = await Api.get("/menu/get-all-items")
    return res.data
}



export const getItemById = async (id) => {
    const res = await Api.get(`/menu/get-item/${id}`)
    return res.data
}

export const addItem = async (formData) => {
    const res = await Api.post('/menu/add-item', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
    return res.data
}




export const deleteItem = async (id) => {
    const res = await Api.delete(`/menu/delete-item/${id}`)
    return res.data
}


export const updateItem = async (id, formData) => {
    const res = await Api.put(`/menu/update-item/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
    return res.data
}