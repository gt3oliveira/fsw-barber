import { getBarberShop, getPopularBarberShop } from "@/actions/barber-shop"
import { BarberShopItem } from "@/components/barber-shop-item"
import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { quickSearchOptions } from "@/constants/types"
import { BookingItem } from "@/components/booking-item"
import { InputSearch } from "@/components/input-search"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getBookings } from "@/actions/booking"
// drop-shadow-[0_0_0.5rem_#ffffff70]

export default async function Home() {
  const session = await getServerSession(authOptions)
  const barberShops = await getBarberShop()
  const popularBarberShops = await getPopularBarberShop()
  const bookings = session?.user ? await getBookings() : []

  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">
          Olá, {session?.user?.name?.split(" ")[0] || "faça seu login"}!
        </h2>
        <p>
          {new Date().toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "2-digit",
            month: "long",
          })}
        </p>

        <div className="my-6 flex items-center gap-x-2">
          <InputSearch />
        </div>

        <div className="mb-6 flex space-x-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              key={option.title}
              variant={"secondary"}
              className="flex items-center gap-2 px-4 py-2"
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  alt={option.title}
                  width={16}
                  height={16}
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>

        <div className="relative h-[150px] w-full">
          <Image
            src="/banner-01.png"
            alt="Agende nos melhores com FSW Barber"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {session?.user && bookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Próximo agendamento
            </h2>
            <BookingItem booking={bookings[0]} />
          </>
        )}

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barberShops.map((barberShop) => (
            <BarberShopItem key={barberShop.id} barberShop={barberShop} />
          ))}
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarberShops.map((barberShop) => (
            <BarberShopItem key={barberShop.id} barberShop={barberShop} />
          ))}
        </div>
      </div>
    </div>
  )
}
