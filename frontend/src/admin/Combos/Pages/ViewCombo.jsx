import React, { useEffect } from 'react'
import Navbar from '../Components/NavBar'
import ViewComboHeader from '../Components/viewComboHeader'
import { useMutation, useQuery } from '@tanstack/react-query'
import { deleteCombos, getComboById } from '../Services/CombosServices'
import { useNavigate, useParams } from 'react-router-dom'
import ComboMainInformation from '../Components/ComboMainInformation'
import Performance from '../Components/Performance'
import { toast } from 'react-toastify'
import ComboItems from '../Components/ComboItems'
import ComboInformation from '../Components/ComboInformation'
import RecentOrders from '../Components/RecentOrders'
import SalesChart from '../Components/SalesChart'

const ViewCombo = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const { data: comboData, isError, error } = useQuery({
        queryKey: ["combo", id],
        queryFn: () => getComboById(id),
    })
    const combo = Array.isArray(comboData) ? comboData[0] : comboData

    useEffect(() => {
        if (isError) {
            const message = error?.response?.data?.message || "Something went wrong"
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
            })
        }
    }, [isError, error])

    const mutation = useMutation({
        mutationFn: () => deleteCombos(id),
        onSuccess: () => {
            toast.success("Combo deleted successfully", { autoClose: 3000 })
            navigate("/admin/combos")
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


    const handleDeleteCombo = () => {
        if (window.confirm("Are you sure you want to delete this combo?")) {
            mutation.mutate(id);
        }
    }

    return (
        <div>
            <Navbar />
            <ViewComboHeader handleDeleteCombo={handleDeleteCombo} />
            <div className='flex gap-[10px]'>
                <ComboMainInformation combo={combo} />
                <Performance combo={combo} />
            </div>
            <div className='flex gap-[10px] mt-[28px] mx-[12px]'>
                <ComboItems items={combo?.items} />
                <ComboInformation combo={combo} />
            </div>
            <div className='flex gap-[10px] mt-[28px] mx-[12px]'>
                <RecentOrders />
                <SalesChart />
            </div>
        </div>
    )
}

export default ViewCombo