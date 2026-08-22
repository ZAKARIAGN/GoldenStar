import React from 'react'

const CategorieOfMenu = () => {
    const categories = [
        { id: 'burger', label: 'Burger', icon: '🍔' },
        { id: 'pizza', label: 'Pizza', icon: '🍕' },
        { id: 'chicken', label: 'Chicken', icon: '🍗' },
        { id: 'ramen', label: 'Ramen', icon: '🍜' },
        { id: 'beverage', label: 'Beverage', icon: '🥤' },
        { id: 'fast_food', label: 'Fast Food', icon: '🍟' },
        { id: 'seafood', label: 'Seafood', icon: '🐟' },
        { id: 'salad', label: 'Salad', icon: '🥗' },
        { id: 'dessert', label: 'Dessert', icon: '🍰' },
        { id: 'bakery', label: 'Bakery', icon: '🥐' }
    ];
    return (
        <div className='mt-6'>
            <h1 className='font-bold text-[30px]'>Categorie</h1>
            <div className='flex items-center gap-5 grid grid-cols-5'>
                {categories.map((category, index) => (
                    <div key={index} className='bg-white mt-2 hover:text-[#C25E0A] hover:scale-110 cursor-pointer transition-all duration-200  flex items-center justify-center gap-2 p-2 rounded-xl'>
                        <span className='text-[35px]'>{category.icon}</span>
                        <span className='font-semibold'>{category.label}</span>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default CategorieOfMenu