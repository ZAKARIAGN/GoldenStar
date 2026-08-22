import React from 'react'
import NavBar from '../Components/NavBar'
import ComboHeader from '../Components/ComboHeader'
import StatisticsCards from '../Components/StatisticsCards'
import TAbleSection from '../Components/TAbleSection'
import FormSection from '../Components/FormSection'
import UpdateFormSection from '../Components/UpdateFormSection'
import { useState } from 'react'

const Combos = () => {
    const [openForm, setOpenForm] = useState(false);
    const [selectedCombo, setSelectedCombo] = useState(null);
    const [openUpdateForm, setOpenUpdateForm] = useState(false);
    return (
        <div>
            <NavBar />
            <ComboHeader setOpenForm={setOpenForm} setOpenUpdateForm={setOpenUpdateForm} />
            <StatisticsCards />
            <div className={`flex ${openForm || openUpdateForm ? 'gap-[20px]' : 'gap-0'} mt-[24px] mx-[12px] transition-all duration-300`}>
                <TAbleSection openForm={openForm} openUpdateForm={openUpdateForm} setOpenForm={setOpenForm} setOpenUpdateForm={setOpenUpdateForm} setSelectedCombo={setSelectedCombo} />
                <FormSection openForm={openForm} setOpenForm={setOpenForm} />
                <UpdateFormSection selectedCombo={selectedCombo} openUpdateForm={openUpdateForm} setOpenUpdateForm={setOpenUpdateForm} />
            </div>

        </div>
    )
}

export default Combos