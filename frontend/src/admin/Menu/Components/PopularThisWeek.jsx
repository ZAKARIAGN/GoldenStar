import React from 'react';
import { burger, pizza, salmon } from './Pictures';
import { Star } from 'lucide-react';

const PopularThisWeek = () => {
    const popularItems = [
        {
            "name": "Double burger",
            "image": burger,
            "price": 11.99,
            "currency": "$",
            "description": "Juicy double beef burger with melted cheese and fresh vegetables.",
            "sales": {
                "sold": "1K",
                "growth": "+15%"
            },
            "reviews": {
                "count": "900+",
                "rating": 4.8
            }
        },
        {
            "name": "Grilled Salmon",
            "image": salmon,
            "price": 25.99,
            "currency": "$",
            "description": "Tender grilled salmon fillet seasoned with herbs and served with fresh vegetables.",
            "sales": {
                "sold": "1K",
                "growth": "+15%"
            },
            "reviews": {
                "count": "1.5k+",
                "rating": 4.9
            }
        },
        {
            "name": "Margherita Pizza",
            "image": pizza,
            "price": 15.99,
            "currency": "$",
            "description": "Classic pizza topped with fresh tomatoes, mozzarella cheese, and basil.",
            "sales": {
                "sold": "620+",
                "growth": "+12%"
            },
            "reviews": {
                "count": "650+",
                "rating": 4.7
            }
        }
    ];

    return (
        <div className='mt-8'>
            <h1 className='font-bold text-[30px] mb-6'>Popular This Week</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {popularItems.map((item, index) => (
                    <div key={index} className='bg-white rounded-[2rem] p-6 flex flex-col gap-4 shadow-sm w-full relative'>
                        {/* Top Section */}
                        <div className='flex justify-between items-start h-[120px]'>
                            <div className="flex flex-col gap-1 pt-2 w-[55%]">
                                <h1 className='text-[22px] font-bold text-black leading-tight'>
                                    {item.name}
                                </h1>
                                <p className='font-bold text-[22px] text-[#C25E0A] mt-2'>
                                    {item.price} {item.currency}
                                </p>
                            </div>
                            <div className="w-[45%] flex justify-end">
                                <img src={item.image} alt={item.name} className='w-[130px] h-[130px] object-contain drop-shadow-lg -mt-4 -mr-2 max-w-none' />
                            </div>
                        </div>

                        {/* Description */}
                        <p className='text-[15px] text-gray-800 font-medium leading-relaxed mt-2 line-clamp-3'>
                            {item.description}
                        </p>

                        {/* Sales */}
                        <div className='flex items-center gap-6 mt-1'>
                            <p className='font-bold text-[15px] text-black'>Sold {item.sales.sold}</p>
                            <p className='font-bold text-[15px] text-[#22c55e]'>{item.sales.growth}</p>
                        </div>

                        {/* Reviews & Rating */}
                        <div className='flex items-center justify-between mt-2'>
                            <p className='font-bold text-[15px] text-black'>{item.reviews.count} Reviews</p>
                            <div className='flex items-center gap-2'>
                                <p className='text-[15px] text-black'>Rating: {item.reviews.rating}</p>
                                <div className='flex gap-1'>
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} fill="#C25E0A" color="#C25E0A" strokeWidth={0} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PopularThisWeek;