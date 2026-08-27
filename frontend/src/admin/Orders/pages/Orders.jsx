import React from 'react'
import OrderNavbar from '../Components/OrderNavbar'
import OrderHeader from '../Components/OrderHeader'
import StatisticsOrdersCards from '../Components/StatisticsOrdersCards'
import OrdersTable from '../Components/OrdersTable'
import { useQuery } from '@tanstack/react-query'
import { getAllOrders } from '../Services/OrdersServices'
const Orders = () => {
    const { data: orders } = useQuery({
        queryKey: ['orders'],
        queryFn: () => getAllOrders()
    })
  return (
    <div>
      <OrderNavbar />
      <OrderHeader />
      <StatisticsOrdersCards orders={orders} />
      <OrdersTable orders={orders} />
    </div>
  )
}

export default Orders