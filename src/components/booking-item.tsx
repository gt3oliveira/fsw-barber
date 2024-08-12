"use client"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Prisma } from "@prisma/client"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import { formatPrice } from "@/hooks/format-price"
import { Button } from "./ui/button"
import { PhoneItem } from "./phone-item"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog"
import { deleteBooking } from "@/actions/booking"
import { redirect } from "next/navigation"
import { toast } from "sonner"
import { useState } from "react"

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
  const {
    service: { barbershop },
  } = booking
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  async function handleDeleteBooking() {
    try {
      await deleteBooking(booking.id)
      setIsSheetOpen(false)
      toast.success("Reserva excluída com sucesso!", {
        icon: "✔",
        position: "bottom-center",
      })
    } catch (error) {
      console.log(error)
      toast.error("Erro ao excluir reserva.", {
        icon: "❌",
        position: "bottom-center",
      })
    }
  }

  function handleSheetOpenChange() {
    setIsSheetOpen(!isSheetOpen)
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger className="w-full">
        <Card
          className={`border-l-8 border-l-primary`}
          onClick={handleSheetOpenChange}
        >
          <CardContent className="flex justify-between pb-0">
            <div className="flex flex-col gap-2 py-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="text-start font-semibold">
                {booking.service.name}
              </h3>

              <div className="flex items-center gap-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={barbershop.imageUrl} />
                </Avatar>
                <p className="text-sm">{barbershop.name}</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-y-2 border-l-2 border-solid pl-6">
              <p className="text-sm capitalize">
                {format(new Date(booking.date), "MMMM", { locale: ptBR })}
              </p>
              <p className="text-2xl">{format(new Date(booking.date), "dd")}</p>
              <p className="text-sm">
                {format(new Date(booking.date), "HH:mm")}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="w-[85%] overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <SheetHeader>
          <SheetTitle className="text-left">Detalhes da reserva</SheetTitle>
        </SheetHeader>

        <div className="relative my-6 flex h-[150px] w-full items-end justify-center pb-5">
          <Image
            src="/map.png"
            alt={`Localização da barbearia ${barbershop.name}`}
            fill
            className="rounded-xl object-cover"
          />
          <Card className="z-10 mx-5 w-full rounded-xl">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage src={barbershop.imageUrl} />
              </Avatar>
              <div>
                <h3 className="font-bold">{barbershop.name}</h3>
                <p className="truncate text-xs text-zinc-400">
                  {barbershop.address}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="border-y border-solid pt-6">
          <Badge className="w-fit">Confirmado</Badge>

          <Card className="mb-6 mt-3">
            <CardContent className="space-y-1 p-3">
              <div className="flex justify-between">
                <h2 className="font-bold">{booking.service.name}</h2>
                <p className="text-sm font-bold">
                  {formatPrice(Number(booking.service.price))}
                </p>
              </div>

              <div className="flex justify-between">
                <h2 className="text-sm text-zinc-400">Data</h2>
                <p className="text-sm">
                  {format(booking.date, "d 'de' MMMM", { locale: ptBR })}
                </p>
              </div>

              <div className="flex justify-between">
                <h2 className="text-sm text-zinc-400">Horário</h2>
                <p className="text-sm">
                  {format(booking.date, "HH:mm", { locale: ptBR })}
                </p>
              </div>

              <div className="flex justify-between">
                <h2 className="text-sm text-zinc-400">Barbearia</h2>
                <p className="text-sm">{barbershop.name}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex w-full flex-col gap-y-2 border-b border-solid py-5">
          <h2 className="text-xs font-semibold uppercase text-zinc-400">
            Contatos
          </h2>

          {barbershop.phones.map((phone, index) => (
            <PhoneItem key={index} phone={phone} />
          ))}
        </div>

        <SheetFooter className="mt-6">
          <div className="flex gap-3">
            <SheetClose asChild>
              <Button className="w-full" variant={"outline"} size={"sm"}>
                Voltar
              </Button>
            </SheetClose>
            <AlertDialog>
              <AlertDialogTrigger className="w-full p-0">
                <Button variant={"destructive"} size={"sm"} className="w-full">
                  Cancelar reserva
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[90%] rounded-xl">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Você quer cancelar esta reserva?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Ao cancelar a reserva, essa ação não poderá ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteBooking}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    Confirmar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
