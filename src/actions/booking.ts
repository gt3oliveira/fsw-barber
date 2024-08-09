"use server"
import { timeList } from "@/constants/types"
import { db } from "@/lib/prisma"
import { endOfDay, startOfDay } from "date-fns"

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

interface GetBookingsProps {
  date: Date
  serviceId: string
}

export async function getBookingsTimesDay(props: GetBookingsProps) {
  const bookings = await db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(props.date),
        gte: startOfDay(props.date),
      },
      serviceId: props.serviceId,
    },
    select: {
      date: true,
    },
  })

  let dateList: string[] = []
  timeList.map((time) => {
    const hour = Number(time.split(":")[0])
    if (!bookings.find((booking) => booking.date.getHours() === hour)) {
      dateList.push(time)
    }
  })

  return dateList
}
