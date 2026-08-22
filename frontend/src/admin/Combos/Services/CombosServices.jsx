import Api from "../../../Services/api"

export const getAllComobos = async () => {
    const res = await Api.get("/combo/get-all-combos")
    return res.data
}


export const deleteCombos = async (id) => {
    const res = await Api.delete(`/combo/delete-combo/${id}`)
    return res.data
}

export const addCombo = async (formData) => {
    const res = await Api.post("/combo/add-combo", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return res.data
}

export const updateCombo = async (id, formData) => {
    const res = await Api.put(`/combo/update-combo/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return res.data
}