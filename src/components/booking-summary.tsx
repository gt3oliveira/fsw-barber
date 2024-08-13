import { Barbershop, BarbershopService, Booking } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import { formatPrice } from "@/hooks/format-price"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface BookingSummaryProps {
  service: Pick<BarbershopService, "name" | "price">
  barberShop: Pick<Barbershop, "name">
  selectDate: Date
}

export default function BookingSummary({
  service,
  barberShop,
  selectDate,
}: BookingSummaryProps) {
  return (
    <Card>
      <CardContent className="space-y-1 p-3">
        <div className="flex justify-between">
          <h2 className="font-bold">{service.name}</h2>
          <p className="text-sm font-bold">
            {formatPrice(Number(service.price))}
          </p>
        </div>

        <div className="flex justify-between">
          <h2 className="text-sm text-zinc-400">Data</h2>
          <p className="text-sm">
            {format(selectDate, "d 'de' MMMM", { locale: ptBR })}
          </p>
        </div>

        <div className="flex justify-between">
          <h2 className="text-sm text-zinc-400">Horário</h2>
          <p className="text-sm">{format(selectDate, "HH:mm")}</p>
        </div>

        <div className="flex justify-between">
          <h2 className="text-sm text-zinc-400">Barbearia</h2>
          <p className="text-sm">{barberShop.name}</p>
        </div>
      </CardContent>
    </Card>
  )
}
