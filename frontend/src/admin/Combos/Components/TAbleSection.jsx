import { ChevronLeft, ChevronRight, Loader2, Pencil, Trash } from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteCombos, getAllComobos } from '../Services/CombosServices'
import { toast } from 'react-toastify'
import { useEffect, useMemo, useState } from 'react'

const TAbleSection = ({ openForm,openUpdateForm, setOpenForm,setOpenUpdateForm,setSelectedCombo}) => {
    const queryClient = useQueryClient();
    const [selectQuery, setSelectQuery] = useState("all")
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;






    const { data, isLoading, error } = useQuery({
        queryKey: ["combos"],
        queryFn: () => getAllComobos(),
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
        },
        onSuccess: (data) => {
            console.log(data)
        }
    })




    const mutation = useMutation({
        mutationFn: (id) => deleteCombos(id),
        onSuccess: (data) => {
            toast.success(data?.message || "Combo item deleted successfully", {
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

            queryClient.invalidateQueries(["combos"])
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




    const filteredCombos = useMemo(() => {
        if (!data) return []

        if (selectQuery === "all") {
            return data
        }

        return data.filter(
            (combo) => combo.status === selectQuery
        )
    }, [data, selectQuery])

    useEffect(() => {
        setCurrentPage(1);
    }, [selectQuery]);

    const paginatedCombos = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredCombos.slice(start, start + itemsPerPage);
    }, [filteredCombos, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(filteredCombos.length / itemsPerPage);











    const handleDelete = (id) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete this combo?`
        );

        if (confirmed) {
            mutation.mutate(id);
        }
    }
    return (
        <div className={`${openForm || openUpdateForm ? 'w-[931px]' : 'w-full'} bg-white rounded-[16px] transition-all duration-300`}>
            <div className="h-[54px] w-full flex justify-between items-center px-4">
                <h1 className="text-[18px] leading-[24px] font-semibold text-[#101828]">
                    All Combos
                </h1>

                <div className="flex items-center gap-2">
                    <div className="relative">
                        <select name="status" id="status" defaultValue="all" className="h-[36px] w-[120px] appearance-none rounded-[8px] border border-[#E4E7EC] bg-white pl-3 pr-8 text-[12px] font-medium text-[#344054] outline-none cursor-pointer focus:border-[#FF5A00]"
                            onChange={e => setSelectQuery(e.target.value)}>
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>

                        <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </div>
                    <button type="button" className="h-[36px] px-3 flex items-center gap-2 rounded-[8px] border border-[#E4E7EC] bg-white text-[12px] font-medium text-[#344054] hover:bg-[#F9FAFB] transition">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 6h16" />
                            <path d="M7 12h10" />
                            <path d="M10 18h4" />
                        </svg>

                        Filter
                    </button>
                </div>
            </div>
            <table className="w-full table-fixed">
                <thead>
                    <tr className="h-[54px] border-b border-gray-100">
                        <th className="w-[300px] px-4 text-left text-xs font-medium text-gray-500">
                            Combo
                        </th>

                        <th className="w-[180px] px-4 text-left text-xs font-medium text-gray-500">
                            Items
                        </th>

                        <th className="w-[120px] px-4 text-left text-xs font-medium text-gray-500">
                            Price
                        </th>

                        <th className="w-[120px] px-4 text-left text-xs font-medium text-gray-500">
                            Status
                        </th>

                        <th className="w-[90px] px-4 text-left text-xs font-medium text-gray-500">
                            Sales
                        </th>

                        <th className="w-[100px] px-4 text-left text-xs font-medium text-gray-500">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>

                    {isLoading ? (
                        <tr>
                            <td colSpan={6} className="text-center py-4">
                                <Loader2 className="animate-spin" />
                            </td>
                        </tr>
                    ) : paginatedCombos?.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="text-center py-4">
                                No combos found
                            </td>
                        </tr>
                    ) : paginatedCombos?.map((Combo, index) => (
                        <tr className="h-[62px] border-b border-gray-100" key={index}>
                            <td className="px-4">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={"http://localhost:5003/" + Combo?.image}
                                        alt={Combo?.name || "Combo"}
                                        className="w-[92px] h-[50px] rounded-lg object-cover"
                                        loading="lazy"
                                    />

                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">
                                            {Combo?.name}
                                        </p>

                                        <p className="text-xs text-gray-500 mt-1">
                                            {Combo?.description}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-4">
                                <div className="flex items-center gap-2">
                                    {Combo?.items?.map((item, index) => (
                                        <span className="w-[30px] h-[30px] rounded-full border border-gray-200 flex items-center justify-center overflow-hidden" key={index}>
                                            <img src={"http://localhost:5002/" + item?.imageUrl} alt={item?.name || ""} className="w-full h-full object-cover rounded-full" loading="lazy" />
                                        </span>
                                    ))}
                                </div>
                            </td>
                            <td className="px-4">
                                <span className="text-sm font-semibold text-orange-500">
                                    {Combo?.price}
                                </span>
                            </td>
                            <td className="px-4">
                                <span className={`inline-flex px-3 py-1 rounded-full ${Combo?.status === "active" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"} text-xs font-medium`}>
                                    {Combo?.status}
                                </span>
                            </td>
                            <td className="px-4 text-sm text-gray-600">
                                {Combo?.totalSales || 0}
                            </td>
                            <td className="px-4">
                                <div className="flex items-center gap-2">
                                    <button className="w-[30px] h-[30px] border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50"
                                        onClick={() => {
                                            setOpenUpdateForm(true)
                                            setOpenForm(false)
                                            setSelectedCombo(Combo)
                                        }}>
                                        <Pencil className='w-[10px] h-[10px]' />
                                    </button>

                                    <button className="w-[30px] h-[30px] border border-red-100 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-50"
                                        onClick={() => handleDelete(Combo?.id)}>
                                        <Trash className='w-[10px] h-[10px]' />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={6} className="h-[51px] border-t border-gray-200 p-0">
                            <div className="h-full flex items-center justify-end pr-4">
                                <div className="flex items-center gap-2">
                                    <button 
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                        className="w-[30px] h-[30px] flex items-center justify-center border border-gray-200 rounded-lg disabled:opacity-50"
                                    >
                                        <ChevronLeft className="w-[10px] h-[10px]" />
                                    </button>

                                    {[...Array(totalPages)].map((_, idx) => (
                                        <button 
                                            key={idx}
                                            onClick={() => setCurrentPage(idx + 1)}
                                            className={`w-[30px] h-[30px] flex items-center justify-center border rounded-lg ${currentPage === idx + 1 ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-gray-200'}`}
                                        >
                                            <span className="text-[12px]">{idx + 1}</span>
                                        </button>
                                    ))}

                                    <button 
                                        disabled={currentPage === totalPages || totalPages === 0}
                                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                        className="w-[30px] h-[30px] flex items-center justify-center border border-gray-200 rounded-lg disabled:opacity-50"
                                    >
                                        <ChevronRight className="w-[10px] h-[10px]" />
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>

        </div>
    )
}

export default TAbleSection