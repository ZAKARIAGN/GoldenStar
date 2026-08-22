import { Camera, X, Eye, Info, UploadCloud, Upload, Pencil } from 'lucide-react'
import React, { useState, useRef } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getItemById, updateItem } from '../Services/MenuServices'
import { useNavigate, useParams } from 'react-router-dom'
import ValidationErrorMsg from '../Components/ValidationErrorMsg'
import { toast } from 'react-toastify';
import { useEffect } from 'react'

const CATEGORIES = [
    { value: '', label: 'Select a category' },
    { value: 'Burger', label: 'Burger' },
    { value: 'Pizza', label: 'Pizza' },
    { value: 'Chicken', label: 'Chicken' },
    { value: 'Ramen', label: 'Ramen' },
    { value: 'Beverages', label: 'Beverages' },
    { value: 'Fast_Food', label: 'Fast Food' },
    { value: 'Seafood', label: 'Seafood' },
    { value: 'Salad', label: 'Salad' },
    { value: 'Dessert', label: 'Dessert' },
    { value: 'Bakery', label: 'Bakery' },
]

const UpdateMenuForm = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [preview, setPreview] = useState(null)
    const [dragging, setDragging] = useState(false)
    const [item, setItem] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
    });
    const [newImage, setNewImage] = useState(null);
    const fileRef = useRef()


    const { data: existingItem } = useQuery({
        queryKey: ["single-item", id],
        queryFn: () => getItemById(id),
    })


    useEffect(() => {
        if (existingItem) {
            setItem({
                name: existingItem?.data?.name,
                description: existingItem?.data?.description,
                price: existingItem?.data?.price,
                category: existingItem?.data?.category,
            });
            setPreview(`http://localhost:5002/${existingItem?.data?.image_path}`);
        }
    }, [existingItem]);

    const handleFile = (file) => {
        if (!file) return
        setNewImage(file);
        const reader = new FileReader()
        reader.onload = (e) => setPreview(e.target.result)
        reader.readAsDataURL(file)
    }

    const HandleChange = (e) => {
        const { name, value } = e.target
        setItem(prev => ({ ...prev, [name]: value }))
    }

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationKey: ["update-menu", id],
        mutationFn: (formData) => updateItem(id, formData),
        onSuccess: (data) => {
            toast.success(data?.message || "Menu item updated successfully", {
                autoClose: 4000,
                position: "top-right",
                icon: "✅",
                style: {
                    background: "#fff",
                    color: "#18181b",
                    border: "1px solid #cefeca",
                    borderRadius: "14px",
                    padding: "14px 18px",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
                    fontSize: "14px",
                    fontWeight: "600",
                },
            });

            queryClient.invalidateQueries({
                queryKey: ["Menu-items"],
            });
            navigate("/admin/menu");
        },
        onError: (error) => {
            const message =
                error?.response?.data?.message ||
                "Something went wrong";

            toast.error(message, {
                autoClose: 4000,
                position: "top-right",
                icon: "⚠️",
                style: {
                    background: "#fff",
                    color: "#18181b",
                    border: "1px solid #fecaca",
                    borderRadius: "14px",
                    padding: "14px 18px",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
                    fontSize: "14px",
                    fontWeight: "600",
                },
            });
        }
    })

    const HandleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", item.name)
        formData.append("description", item.description)
        formData.append("price", item.price)
        formData.append("category", item.category)
        if (newImage) {
            formData.append("image", newImage);
        }
        mutation.mutate(formData);
    }

    const inputClasses = "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-[#C25E0A] focus:ring-1 focus:ring-[#C25E0A] font-[inherit]"
    const labelClasses = "text-sm font-semibold text-gray-900 block mb-1.5"

    return (
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 my-6">
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#C25E0A] rounded-full flex items-center justify-center text-white shrink-0">
                        <Pencil className="w-6 h-6" />
                    </div>

                    <div>
                        <h1 className="text-xl font-bold text-gray-900">
                            Update Item
                        </h1>
                        <p className="text-sm text-gray-500">
                            Update an item for your menu
                        </p>
                    </div>

                </div>
                <button
                    onClick={() => navigate(-1)}
                    type="button"
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <form onSubmit={HandleSubmit} className="flex flex-col">
                <div className="flex flex-col lg:flex-row p-8 gap-10">

                    <div className="flex-1 space-y-6">
                        <div>
                            <label className={labelClasses}>
                                Name <span className="text-[#C25E0A]">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="name"
                                    maxLength={100}
                                    value={item.name}
                                    onChange={HandleChange}
                                    className={inputClasses + " pr-20"}

                                />
                                {mutation.error?.response?.data?.errors?.name && (
                                    <ValidationErrorMsg error={mutation.error?.response?.data?.errors?.name} />
                                )}
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                                    {item.name.length} / 100
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1.5">Enter a name for the item (max 100 characters)</p>
                        </div>

                        <div>
                            <label className={labelClasses}>
                                Description <span className="text-[#C25E0A]">*</span>
                            </label>
                            <div className="relative">
                                <textarea
                                    name="description"
                                    rows={4}
                                    maxLength={1000}
                                    value={item.description}
                                    onChange={HandleChange}
                                    className={inputClasses + " resize-none pb-8"}

                                />
                                {mutation.error?.response?.data?.errors?.description && (
                                    <ValidationErrorMsg error={mutation.error?.response?.data?.errors?.description} />
                                )}
                                <span className="absolute right-3 bottom-3 text-xs text-gray-400">
                                    {item.description.length} / 1000
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1.5">Describe the item, its taste and what's included.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className={labelClasses}>
                                    Price <span className="text-[#C25E0A]">*</span>
                                </label>
                                <div className="relative flex items-center">
                                    <div className="absolute left-0 top-0 bottom-0 w-14 bg-[#C25E0A]/10 border border-gray-200 border-r rounded-l-lg flex items-center justify-center text-[#C25E0A] text-sm font-semibold">
                                        DH
                                    </div>

                                    <input
                                        type="number"
                                        name="price"
                                        min="0"
                                        step="0.01"
                                        value={item.price}
                                        onChange={HandleChange}
                                        className={inputClasses + " pl-16"}
                                        placeholder="85.00"

                                    />

                                </div>
                                {mutation.error?.response?.data?.errors?.price && (
                                    <ValidationErrorMsg error={mutation.error?.response?.data?.errors?.price} />
                                )}
                                <p className="text-xs text-gray-500 mt-1.5">Enter the price in DH</p>
                            </div>

                            <div>
                                <label className={labelClasses}>
                                    Category <span className="text-[#C25E0A]">*</span>
                                </label>
                                <select
                                    name="category"
                                    value={item.category}
                                    onChange={HandleChange}
                                    className={inputClasses}

                                >
                                    {CATEGORIES.map(c => (
                                        <option key={c.value} value={c.value}>{c.label}</option>
                                    ))}
                                </select>
                                {mutation.error?.response?.data?.errors?.category && (
                                    <ValidationErrorMsg error={mutation.error?.response?.data?.errors?.category} />
                                )}
                                <p className="text-xs text-gray-500 mt-1.5">Select a category</p>
                            </div>
                        </div>

                        <div>
                            <label className={labelClasses}>
                                Image <span className="text-[#C25E0A]">*</span>
                            </label>
                            <div
                                onClick={() => fileRef.current.click()}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    setDragging(true);
                                }}
                                onDragLeave={() => setDragging(false)}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    setDragging(false);
                                    handleFile(e.dataTransfer.files[0]);
                                }}
                                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 ${dragging ? "border-[#C25E0A] bg-[#C25E0A]/5" : "border-gray-300 bg-white hover:border-[#C25E0A]/60 hover:bg-[#C25E0A]/5"}`}
                            >
                                <div className="w-12 h-12 rounded-full bg-[#C25E0A]/10 flex items-center justify-center text-[#C25E0A]">
                                    <UploadCloud className="w-6 h-6" />
                                </div>

                                <div className="text-center">
                                    <p className="font-semibold text-gray-900">
                                        Upload an image
                                    </p>

                                    <p className="text-sm text-gray-500 mt-1">
                                        PNG, JPG or WEBP (Max 5MB)
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        fileRef.current.click();
                                    }}
                                    className="mt-2 px-4 py-2 border border-[#C25E0A]/30 rounded-lg text-sm font-semibold text-[#C25E0A] bg-white flex items-center gap-2 hover:bg-[#C25E0A]/10 hover:border-[#C25E0A]/50 transition-all duration-200"
                                >
                                    <Upload className="w-4 h-4" />
                                    Choose File
                                </button>

                                <input
                                    ref={fileRef}
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp"
                                    className="hidden"
                                    onChange={(e) => handleFile(e.target.files[0])}

                                />
                                {mutation.error?.response?.data?.errors?.image && (
                                    <ValidationErrorMsg error={mutation.error?.response?.data?.errors?.image} />
                                )}
                            </div>
                        </div>

                    </div>






                    <div className="w-full lg:w-[45%] flex flex-col bg-white p-6 rounded-2xl border border-gray-100">
                        <div className="flex items-center gap-2 mb-4 text-[#C25E0A] font-semibold text-sm">
                            <Eye className="w-5 h-5" />
                            Image Preview
                        </div>

                        <div className="flex-1 h-full w-full rounded-xl overflow-hidden shadow-sm flex items-center justify-center relative border">
                            {preview ? (
                                <img src={preview} alt="preview" className="w-[300px] h-[300px] object-cover" />
                            ) : (
                                <div className="text-gray-500 text-sm flex flex-col items-center">
                                    <Camera className="w-8 h-8 mb-2 opacity-50" />
                                    No image selected
                                </div>
                            )}
                        </div>

                        <div className="mt-6 bg-white/80 rounded-xl p-4 flex gap-3 border border-[#C25E0A]">
                            <Info className="w-5 h-5 text-[#C25E0A] shrink-0 mt-0.5" />
                            <div className="text-sm text-black leading-relaxed">
                                Upload an image that represents your item. <br />
                                Recommended size: 1200x800px
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-5 border-t border-gray-100 flex justify-between items-center bg-white rounded-b-2xl">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/menu')}
                        className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2.5 rounded-lg bg-[#C25E0A] text-white font-semibold text-sm hover:bg-[#C25E0A]/90 transition-colors shadow-sm flex items-center gap-2"
                    >
                        <Pencil className="w-4 h-4" />
                        Update item
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UpdateMenuForm
