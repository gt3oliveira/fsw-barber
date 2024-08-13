"use server"
import { timeList } from "@/constants/types"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/prisma"
import { endOfDay, isPast, isToday, set, startOfDay } from "date-fns"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

interface BookingsProps {
  date: Date
  serviceId: string
}

export async function postBooking(params: BookingsProps) {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error("Usuário não autenticado.")
  }

  await db.booking.create({
    data: {
      ...params,
      userId: session.user.id,
    },
  })
  revalidatePath("/barbershops/[id]")
  revalidatePath("/bookings")
}

export async function getBookingsTimesDay(props: BookingsProps) {
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
    const minute = Number(time.split(":")[1])

    const timeIsOnThePast = isPast(
      set(new Date(), { hours: hour, minutes: minute }),
    )

    if (timeIsOnThePast && isToday(props.date)) {
      return false
    }

    if (!bookings.find((booking) => booking.date.getHours() === hour)) {
      dateList.push(time)
    }
  })

  return dateList
}

export async function getBookings() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    throw new Error("Usuário não autenticado.")
  }

  return await db.booking.findMany({
    where: {
      userId: session.user.id,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  })
}

export async function deleteBooking(bookingId: string) {
  await db.booking.delete({
    where: {
      id: bookingId,
    },
  })
  revalidatePath("/bookings")
}
