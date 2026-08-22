import React from 'react';
import { Star } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getAllItems } from '../Services/MenuServices';
import { Link } from 'react-router-dom';
import CardOfitem from './CardOfitem';

const AllMenu = () => {


    const { data: allItems, isLoading } = useQuery({
        queryKey: ["Menu-items"],
        queryFn: () => getAllItems(),
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

    return (
        <div className='mt-8'>
            <div className="flex items-center justify-between gap-4 mb-6">
                <h1 className='font-bold text-[30px]'>All Menu</h1>
                <Link to='/admin/menu/full-menu' className='underline text-[#0ea5e9] font-semibold cursor-pointer'>view all <span className='text-2xl'>→</span></Link>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {isLoading ? (
                    <div className="col-span-full flex min-h-[250px] items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-100 border-t-amber-600"></div>

                            <p className="text-lg font-semibold text-gray-500">
                                Loading menu...
                            </p>
                        </div>
                    </div>
                ) : allItems?.data?.length === 0 ? (
                    <div className="col-span-full flex min-h-[300px] flex-col items-center justify-center rounded-[2rem] border border-dashed border-amber-200 bg-amber-50/50 p-8 text-center">

                        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
                            <span className="text-4xl">🍽️</span>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800">
                            No Menu Items Found
                        </h2>

                        <p className="mt-2 max-w-md text-sm text-gray-500">
                            Your menu is empty. Add your first menu item to get started.
                        </p>

                    </div>
                ) :
                    allItems?.data?.slice(0, 3).map((item, index) => (
                        <CardOfitem key={index} item={item} />
                    ))}
            </div>
        </div>
    );
}

export default AllMenu;