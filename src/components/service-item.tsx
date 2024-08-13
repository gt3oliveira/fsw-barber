"use client"
import { Barbershop, BarbershopService } from "@prisma/client"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { formatPrice } from "@/hooks/format-price"
import { Card, CardContent } from "./ui/card"
import { Dialog, DialogContent } from "./ui/dialog"
import SignInDialog from "./sign-in-dialog"
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
import { getBookingsTimesDay, postBooking } from "@/actions/booking"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import BookingSummary from "./booking-summary"
import { formatDate } from "@/hooks/formatDate"

interface ServiceItemProps {
  service: BarbershopService
  barberShop: Pick<Barbershop, "name">
}

export function ServiceItem({ service, barberShop }: ServiceItemProps) {
  const router = useRouter()
  const session = useSession()

  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [selectDay, setSelectDay] = useState<Date | undefined>(new Date())
  const [selectTime, setSelectTime] = useState<string | undefined>(undefined)
  const [timesBookings, setTimesBookings] = useState<string[]>([])
  const [sheetOpen, setSheetOpen] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      setSelectTime(undefined)
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

      await postBooking({
        serviceId: service.id,
        date: formatDate(selectTime, selectDay),
      })

      handleSheetOpenChange()
      toast.success("Reserva criada com sucesso!", {
        icon: "💈",
        position: "bottom-center",
        action: {
          label: "Ver agendamentos",
          onClick: () => router.push("/bookings"),
        },
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
    <>
      <Card>
        <CardContent className="flex w-full gap-3 p-3">
          <div className="relative h-[110px] min-w-[110px]">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              className="rounded-xl object-cover"
            />
          </div>

          <div className="flex w-full flex-col justify-between">
            <div className="flex max-w-[200px] flex-col gap-y-1">
              <h3 className="text-sm font-semibold">{service.name}</h3>
              <p className="line-clamp-2 text-sm text-gray-400">
                {service.description}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-primary">
                {formatPrice(Number(service.price))}
              </p>

              <Sheet open={sheetOpen} onOpenChange={handleSheetOpenChange}>
                {session.data?.user ? (
                  <Button
                    variant={"secondary"}
                    size={"sm"}
                    onClick={() => setSheetOpen(true)}
                  >
                    Reservar
                  </Button>
                ) : (
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    onClick={() => setIsOpenDialog(true)}
                  >
                    Reservar
                  </Button>
                )}
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
                      {timesBookings.length > 0 ? (
                        timesBookings.map((time) => (
                          <Button
                            key={time}
                            variant={
                              selectTime === time ? "default" : "outline"
                            }
                            onClick={() => handleTimeSelect(time)}
                            className="rounded-full"
                          >
                            {time}
                          </Button>
                        ))
                      ) : (
                        <p className="text-zinc-400">
                          ❌ Nenhum horário disponível.
                        </p>
                      )}
                    </div>
                  )}

                  {selectTime && selectDay && (
                    <div className="m-5">
                      <BookingSummary
                        service={service}
                        barberShop={barberShop}
                        selectDate={formatDate(selectTime, selectDay)}
                      />
                    </div>
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

      <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <DialogContent className="max-w-[90%]">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  )
}
