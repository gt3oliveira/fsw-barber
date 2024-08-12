import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Prisma } from "@prisma/client"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"

interface BookingsItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

export function BookingItem({ booking }: BookingsItemProps) {
  const isConfirmed = isFuture(booking.date)

  return (
    <Card className={`border-l-8 border-l-primary`}>
      <CardContent className="flex justify-between pb-0">
        <div className="flex flex-col gap-2 py-5">
          <Badge className="w-fit">Confirmado</Badge>
          <h3 className="font-semibold">{booking.service.name}</h3>

          <div className="flex items-center gap-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={booking.service.barbershop.imageUrl} />
            </Avatar>
            <p className="text-sm">{booking.service.barbershop.name}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-y-2 border-l-2 border-solid pl-6">
          <p className="text-sm capitalize">
            {format(new Date(booking.date), "MMMM", { locale: ptBR })}
          </p>
          <p className="text-2xl">{format(new Date(booking.date), "dd")}</p>
          <p className="text-sm">{format(new Date(booking.date), "HH:mm")}</p>
        </div>
      </CardContent>
    </Card>
  )
}
