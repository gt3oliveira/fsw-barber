"use server"
import { db } from "@/lib/prisma"

interface CreateBooking {
  userId: string
  serviceId: string
  date: Date
}

export async function postBooking(booking: CreateBooking) {
  await db.booking.create({
    data: {
      serviceId: booking.serviceId,
      userId: booking.userId,
      date: booking.date,
    },
  })
}
