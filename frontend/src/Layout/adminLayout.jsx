import React from 'react'
import SideBarAdmin from '../admin/SideBar/Components/SideBarAdmin'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className='flex min-h-screen bg-[#EBEBEB] font-["Plus_Jakarta_Sans",sans-serif] relative overflow-hidden'>


      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />


      <SideBarAdmin />


      <main className='flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative z-10'>

        <div className='flex-1 overflow-y-auto custom-scrollbar'>
          <div className='max-w-[1600px] mx-auto'>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminLayout