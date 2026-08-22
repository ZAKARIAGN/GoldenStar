import React, { useState } from 'react'
import HeaderOfMenu from '../Components/HeaderOfMenu'
import CategorieOfMenu from '../Components/CategorieOfMenu'
import PopularThisWeek from '../Components/PopularThisWeek'
import MenuPreview from '../Components/MenuPreview'

const Menu = () => {

  return (
    <div className="w-full max-w-[1400px] p-4 mx-auto relative z-10 mt--10">

      <HeaderOfMenu />

      <CategorieOfMenu />

      <PopularThisWeek />

      <MenuPreview />
    </div>
  )
}

export default Menu