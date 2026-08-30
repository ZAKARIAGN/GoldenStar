import React from 'react'
import NavBar from '../Components/NavBar'
import BookingHeader from '../Components/BookingHeader'
import BookingsCards from '../Components/StatisticsBookingsCards'
import { useQuery } from '@tanstack/react-query'
import { getAllBookings } from '../Services/BookingsServices'

const Bookings = () => {
    const {data:bookings, isLoading,isError} = useQuery({
        queryKey:['bookings'],
        queryFn:getAllBookings
    })

    if(isLoading){
        return <div>Loading...</div>
    }
    if(isError){
        return <div>Error</div>
    }
  return (
    <div>
    <NavBar />
    <BookingHeader />
    <BookingsCards bookings={bookings} />
    </div>
  )
}

export default Bookings