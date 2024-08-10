"use client"
import { Barbershop, BarbershopService } from "@prisma/client"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { formatPrice } from "@/hooks/format-price"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { format, set } from "date-fns"
import { getBookingsTimesDay, postBooking } from "@/actions/booking"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

interface ServiceItemProps {
  service: BarbershopService
  barberShop: Pick<Barbershop, "name">
}

export function ServiceItem({ service, barberShop }: ServiceItemProps) {
  const { data: session } = useSession()
  const [selectDay, setSelectDay] = useState<Date | undefined>(undefined)
  const [selectTime, setSelectTime] = useState<string | undefined>(undefined)
  const [timesBookings, setTimesBookings] = useState<string[]>([])
  const [sheetOpen, setSheetOpen] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      if (!selectDay) return
      const bookings = await getBookingsTimesDay({
        date: selectDay,
        serviceId: service.id,
      })
      setTimesBookings(bookings)
    }
    fetch()
  }, [selectDay, service.id])

  function handleDateSelect(day: Date | undefined) {
    setSelectDay(day)
  }

  function handleTimeSelect(time: string | undefined) {
    setSelectTime(time)
  }

  function handleSheetOpenChange() {
    setSelectDay(undefined)
    setSelectTime(undefined)
    setTimesBookings([])
    setSheetOpen(false)
  }

  async function handleCreateBooking() {
    try {
      if (!selectDay || !selectTime) return
      const hour = Number(selectTime.split(":")[0])
      const minute = Number(selectTime.split(":")[1])
      const newDate = set(selectDay, { minutes: minute, hours: hour })

      await postBooking({
        serviceId: service.id,
        date: newDate,
      })

      handleSheetOpenChange()
      toast.success("Reserva criada com sucesso!", {
        icon: "💈",
        position: "bottom-center",
      })
    } catch (error) {
      console.log(error)
      toast.error("Algo deu errado! Erro ao criar reserva.", {
        icon: "❌",
        position: "bottom-center",
      })
    }
  }

  return (
    <Card>
      <CardContent className="flex gap-3 p-3">
        <div className="relative h-[110px] min-w-[110px]">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="rounded-xl object-cover"
          />
        </div>

        <div className="flex w-full flex-col justify-between">
          <div className="flex flex-col gap-y-1">
            <h3 className="text-sm font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-400">{service.description}</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-primary">
              {formatPrice(Number(service.price))}
            </p>

            <Sheet open={sheetOpen} onOpenChange={handleSheetOpenChange}>
              <Button
                variant={"secondary"}
                size={"sm"}
                onClick={() => setSheetOpen(true)}
              >
                Reservar
              </Button>
              <SheetContent className="overflow-y-auto px-0 [&::-webkit-scrollbar]:hidden">
                <SheetHeader>
                  <SheetTitle className="px-5 text-left">
                    Fazer Reserva
                  </SheetTitle>
                </SheetHeader>

                <div className="border-b border-solid py-5">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={selectDay}
                    onSelect={handleDateSelect}
                    fromDate={new Date()}
                    styles={{
                      head_cell: {
                        width: "100%",
                        textTransform: "capitalize",
                      },
                      cell: {
                        width: "100%",
                      },
                      button: {
                        width: "100%",
                      },
                      nav_button_previous: {
                        width: "32px",
                        height: "32px",
                      },
                      nav_button_next: {
                        width: "32px",
                        height: "32px",
                      },
                      caption: {
                        textTransform: "capitalize",
                      },
                    }}
                  />
                </div>

                {selectDay && (
                  <div className="flex gap-x-4 overflow-x-auto border-b border-solid p-5 [&::-webkit-scrollbar]:hidden">
                    {timesBookings.map((time) => (
                      <Button
                        key={time}
                        variant={selectTime === time ? "default" : "outline"}
                        onClick={() => handleTimeSelect(time)}
                        className="rounded-full"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                )}

                {selectTime && selectDay && (
                  <Card className="m-5">
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
                          {format(selectDay, "d 'de' MMMM", { locale: ptBR })}
                        </p>
                      </div>

                      <div className="flex justify-between">
                        <h2 className="text-sm text-zinc-400">Horário</h2>
                        <p className="text-sm">{selectTime}</p>
                      </div>

                      <div className="flex justify-between">
                        <h2 className="text-sm text-zinc-400">Barbearia</h2>
                        <p className="text-sm">{barberShop.name}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <SheetFooter className="mt-5 px-5">
                  <SheetClose asChild>
                    <Button
                      onClick={handleCreateBooking}
                      disabled={!selectDay || !selectTime}
                    >
                      Confirmar
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
