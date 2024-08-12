import { getBookings } from "@/actions/booking"
import { BookingItem } from "@/components/booking-item"
import Header from "@/components/Header"
import React from "react"

export default async function BookingsPage() {
  const bookings = await getBookings()

  return (
    <>
      <Header />
      <div className="p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        {bookings.map((booking) => (
          <div key={booking.id} className="my-4">
            <BookingItem booking={booking} />
          </div>
        ))}
      </div>
    </>
  )
}
