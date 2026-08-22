import React from 'react'
import { Star, Pencil, Trash2, Heart } from 'lucide-react';
import { deleteItem } from '../Services/MenuServices';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
const CardOfitem = ({item, index}) => {

const queryClient = useQueryClient();

const mutation = useMutation({
    mutationFn: (id) => deleteItem(id),
        onSuccess: (data) => {
            toast.success(data?.message || "Menu item deleted successfully", {
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

const HandleDelete = (id) => {
    const confirmed = window.confirm(
        `Are you sure you want to delete ${item.name}?`
    );

    if (confirmed) {
        mutation.mutate(id);
    }
};

  return (
    <div key={index} className='bg-white rounded-[24px] flex flex-col shadow-sm w-full relative group hover:shadow-md transition-shadow border border-gray-100 overflow-hidden pb-4'>
        
        {/* Top Section / Image */}
        <div className='relative w-full h-[220px] bg-[#f8f8f8] flex justify-center items-center overflow-hidden'>
            <img src={`http://localhost:5002/${item.image_path}`} alt={item.name} className='w-full h-full object-cover transition-transform group-hover:scale-105 duration-300' />
            <button className='absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform'>
                <Heart size={20} className="text-black" />
            </button>
        </div>

        {/* Content Section */}
        <div className='px-5 flex flex-col gap-3 mt-4'>
            {/* Title */}
            <h1 className='text-[22px] font-bold text-gray-900 leading-tight'>
                {item.name}
            </h1>
            
            {/* Price */}
            <p className='font-bold text-[20px] text-[#ea580c]'>
                {item.price} $
            </p>

            {/* Description */}
            <p className='text-[14px] text-gray-600 font-medium leading-relaxed line-clamp-2'>
                {item.description}
            </p>

            {/* Sales */}
            <div className='flex items-center gap-3 mt-1'>
                <p className='font-bold text-[14px] text-gray-900'>Sold {item.sales?.sold || '1K'}</p>
                <span className='bg-[#f0fdf4] text-[#16a34a] font-bold text-[12px] px-2.5 py-1 rounded-full'>
                    {item.sales?.growth || '+15%'}
                </span>
            </div>

            {/* Reviews & Rating */}
            <div className='flex items-center justify-between mt-3'>
                <div className='flex items-center gap-2'>
                    {/* Avatars */}
                    <div className='flex -space-x-2'>
                        <img className='w-7 h-7 rounded-full border-[1.5px] border-white object-cover' src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar"/>
                        <img className='w-7 h-7 rounded-full border-[1.5px] border-white object-cover' src="https://randomuser.me/api/portraits/men/46.jpg" alt="avatar"/>
                        <img className='w-7 h-7 rounded-full border-[1.5px] border-white object-cover' src="https://randomuser.me/api/portraits/men/90.jpg" alt="avatar"/>
                        <img className='w-7 h-7 rounded-full border-[1.5px] border-white object-cover' src="https://randomuser.me/api/portraits/men/33.jpg" alt="avatar"/>
                    </div>
                    <p className='text-[13px] text-gray-500 font-medium'>{item.total_review || '900+'} Reviews</p>
                </div>
                
                <div className='flex items-center gap-1.5'>
                    <p className='text-[13px] text-gray-500 font-medium'>Rating: {item.avg_rating || '4.8'}</p>
                    <div className='flex gap-0.5'>
                        {[...Array(Math.round(item.avg_rating || 5))].map((_, i) => (
                            <Star key={i} size={14} fill="#ea580c" color="#ea580c" strokeWidth={0} />
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Actions */}
        <div className='px-5 flex items-center justify-end gap-3 mt-4 pt-4 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            <Link to={`/admin/menu/update-item/${item.id}`} className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors'>
                <Pencil size={16} /> Edit
            </Link>
            <button onClick={() => HandleDelete(item.id)} className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors'>
                <Trash2 size={16} /> Delete
            </button>
        </div>
    </div>
  )
}

export default CardOfitem