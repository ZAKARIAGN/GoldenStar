import React, { useState } from "react";
import { Upload, ChevronDown, X } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllItems } from "../../Menu/Services/MenuServices";
import { addCombo } from "../Services/CombosServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ValidationErrorMsg from "../../Menu/Components/ValidationErrorMsg";

const FormSection = ({ openForm, setOpenForm }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [formdata, setFormdata] = useState({
    name: "",
    description: "",
    price: "",
    items: [],
    image: "",
    status: "active"
  });

  const handleFile = (file) => {
    if (!file) return;
    setFormdata(prev => ({ ...prev, image: file }));
  };

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setFormdata(prev => ({ ...prev, [name]: value }));
  };

  const { data: menuItems, isLoading: loadingItems } = useQuery({
    queryKey: ["Menu-items"],
    queryFn: getAllItems
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["new-combo"],
    mutationFn: (formData) => addCombo(formData),
    onSuccess: (data) => {
      toast.success(data?.message || "Combo created successfully", {
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
        queryKey: ["combos"],
      });
      setFormdata({
        name: "",
        description: "",
        price: "",
        items: [],
        image: ""
      });
      setOpenForm(false);
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
  });

  const HandleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", formdata.name);
    formData.append("description", formdata.description);
    formData.append("price", formdata.price);
    formData.append("status", formdata.status);
    formData.append("items", JSON.stringify(formdata.items));
    formData.append("image", formdata.image);
    mutation.mutate(formData);
  };








  return (
    <form onSubmit={HandleSubmit} className={`${openForm ? "w-[375px] opacity-100 p-4 border border-gray-200" : "w-0 opacity-0 p-0 border-0 pointer-events-none"} transition-all duration-300 overflow-hidden min-h-[603px] rounded-xl bg-white shadow-sm`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[16px] font-semibold text-gray-900">
          Add New Combo
        </h2>
        <button
          type="button"
          onClick={() => setOpenForm(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
      </div>

      {/* Upload Image */}
      <label
        htmlFor="image"
        className="mb-4 flex h-[100px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 hover:border-[#FF5A00] hover:bg-orange-50/30 transition"
      >
        {formdata.image ? (
          <div className="flex flex-col items-center text-center p-2">
            <span className="text-[12px] font-semibold text-green-600">Selected Image:</span>
            <span className="text-[11px] text-gray-600 mt-1 max-w-[280px] truncate">{formdata.image.name || "combo_image.png"}</span>
            <span className="text-[10px] text-gray-400 mt-1">Click to change</span>
          </div>
        ) : (
          <>
            <Upload size={20} className="mb-2 text-gray-500" />
            <p className="text-sm font-medium text-gray-700">Upload Image</p>
            <span className="mt-1 text-[11px] text-gray-400">PNG, JPEG up to 2MB</span>
          </>
        )}

        <input
          id="image"
          type="file"
          accept="image/png,image/jpeg"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files[0]
            if (file) {
              handleFile(file)
            }
          }}
        />
      </label>
      {mutation.error?.response?.data?.errors?.image && (
        <ValidationErrorMsg error={mutation.error?.response?.data?.errors?.image} />
      )}

      {/* Combo Name */}
      <div className="mb-3">
        <label className="mb-1.5 block text-[12px] font-medium text-gray-700">
          Combo Name <span className="text-red-500">*</span>
        </label>

        <input
          type="text"
          onChange={HandleChange}
          name="name"
          value={formdata.name}
          placeholder="e.g. Classic Burger Combo"
          className="h-9 w-full rounded-lg border border-gray-200 px-3 text-[12px] outline-none transition focus:border-orange-500"
        />
        {mutation.error?.response?.data?.errors?.name && (
          <ValidationErrorMsg error={mutation.error?.response?.data?.errors?.name} />
        )}
      </div>

      {/* Description */}
      <div className="mb-3">
        <label className="mb-1.5 block text-[12px] font-medium text-gray-700">
          Description <span className="text-red-500">*</span>
        </label>

        <input
          type="text"
          placeholder="e.g. Burger + Fries + Cola"
          onChange={HandleChange}
          name="description"
          value={formdata.description}
          className="h-9 w-full rounded-lg border border-gray-200 px-3 text-[12px] outline-none transition focus:border-orange-500"
        />
        {mutation.error?.response?.data?.errors?.description && (
          <ValidationErrorMsg error={mutation.error?.response?.data?.errors?.description} />
        )}
      </div>

      {/* Select Items */}
      <div className="mb-3">
        <label className="mb-1.5 block text-[12px] font-medium text-gray-700">
          Select Items <span className="text-red-500">*</span>
        </label>

        {/* Select items button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowDropdown(prev => !prev)}
            className="flex h-9 w-full items-center justify-between rounded-lg border border-gray-200 px-3 text-[12px] text-gray-400 hover:border-orange-400 transition"
          >
            <span>{formdata.items.length > 0 ? `${formdata.items.length} item(s) selected` : "Select items"}</span>
            <ChevronDown size={15} className={`transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`} />
          </button>

          {/* Dropdown list */}
          {showDropdown && (
            <div className="absolute z-20 mt-1 w-full max-h-[180px] overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
              {loadingItems ? (
                <p className="px-3 py-2 text-[12px] text-gray-400">Loading items...</p>
              ) : menuItems?.data?.length === 0 ? (
                <p className="px-3 py-2 text-[12px] text-gray-400">No items available</p>
              ) : (
                menuItems?.data?.map((item) => {
                  const isSelected = formdata.items.some(i => (i.item_id || i.id) === item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          setFormdata(prev => ({
                            ...prev,
                            items: prev.items.filter(i => (i.item_id || i.id) !== item.id)
                          }));
                        } else {
                          setFormdata(prev => ({
                            ...prev,
                            items: [...prev.items, { id: item.id, item_id: item.id, name: item.name, quantity: 1 }]
                          }));
                        }
                      }}
                      className={`flex w-full items-center gap-2 px-3 py-2 text-left text-[12px] hover:bg-orange-50 transition ${isSelected ? "bg-orange-50 text-orange-600 font-medium" : "text-gray-700"}`}
                    >
                      <span className="flex-1">{item.name}</span>
                      {isSelected && <span className="text-orange-500 font-bold">✓</span>}
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Selected items */}
        <div className="mt-2 flex flex-col gap-2">
          {formdata.items.map((item, index) => (
            <div
              key={item.item_id || item.id || index}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-2"
            >
              {/* Item name */}
              <span className="text-[11px] font-medium text-gray-700">
                {item.name}
              </span>

              <div className="flex items-center gap-2">
                {/* Quantity */}
                <div className="flex h-7 items-center rounded-md border border-gray-200 bg-white">
                  <button
                    type="button"
                    className="flex h-full w-6 items-center justify-center text-gray-500 hover:bg-gray-100"
                    onClick={() => {
                      setFormdata((prev) => ({
                        ...prev,
                        items: prev.items.map((i) =>
                          (i.item_id || i.id) === (item.item_id || item.id)
                            ? {
                              ...i,
                              quantity: Math.max(
                                1,
                                i.quantity - 1
                              ),
                            }
                            : i
                        ),
                      }))
                    }}
                  >
                    -
                  </button>

                  <span className="w-6 text-center text-[11px] font-medium text-gray-700">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    className="flex h-full w-6 items-center justify-center text-gray-500 hover:bg-gray-100"
                    onClick={() => {
                      setFormdata((prev) => ({
                        ...prev,
                        items: prev.items.map((i) =>
                          (i.item_id || i.id) === (item.item_id || item.id)
                            ? {
                              ...i,
                              quantity: i.quantity + 1,
                            }
                            : i
                        ),
                      }))
                    }}
                  >
                    +
                  </button>
                </div>

                {/* Remove */}
                <button
                  type="button"
                  className="text-gray-400 hover:text-red-500"
                  onClick={() => {
                    setFormdata((prev) => ({
                      ...prev,
                      items: prev.items.filter(
                        (i) => (i.item_id || i.id) !== (item.item_id || item.id)
                      ),
                    }))
                  }}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
        {mutation.error?.response?.data?.errors?.items && (
          <ValidationErrorMsg error={mutation.error?.response?.data?.errors?.items} />
        )}
      </div>

      {/* Price */}
      <div className="mb-3">
        <label className="mb-1.5 block text-[12px] font-medium text-gray-700">
          Price <span className="text-red-500">*</span>
        </label>

        <div className="relative">
          <input
            type="number"
            onChange={HandleChange}
            name="price"
            value={formdata.price}
            placeholder="0.00"
            className="h-9 w-full rounded-lg border border-gray-200 px-3 pr-8 text-[12px] outline-none focus:border-orange-500"
          />

          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-gray-500">
            $
          </span>
        </div>
        {mutation.error?.response?.data?.errors?.price && (
          <ValidationErrorMsg error={mutation.error?.response?.data?.errors?.price} />
        )}
      </div>

      {/* Status */}
      <div className="mb-6">
        <label className="mb-1.5 block text-[12px] font-medium text-gray-700">
          Status
        </label>
        {mutation.error?.response?.data?.errors?.status && (
          <ValidationErrorMsg error={mutation.error?.response?.data?.errors?.status} />
        )}

        <select className="flex h-9 items-center justify-between rounded-lg border border-gray-200 px-3 text-[12px] text-gray-700" onChange={HandleChange} name="status" value={formdata.status}>
          <option value="active" className='capitalize'>Active</option>
          <option value="inactive" className='capitalize'>Inactive</option>
        </select>
      </div>

      {/* Actions */}
      <div className="flex gap-8">
        <button
          type="button"
          onClick={() => setOpenForm(false)}
          className="h-9 flex-1 rounded-lg border border-gray-200 bg-gray-50 text-[12px] font-medium text-gray-700 hover:bg-gray-100 cursor-pointer"
        >
          Cancel
        </button>

        <button type='submit' disabled={mutation.isPending} className="h-9 flex-[1.45] rounded-lg bg-orange-600 text-[12px] font-medium text-white transition hover:bg-orange-700 cursor-pointer">
          {mutation.isPending ? "Adding..." : "Save Combo"}
        </button>
      </div>
    </form>
  );
};

export default FormSection;