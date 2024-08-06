import { getBarberShop, getPopularBarberShop } from "@/actions/barber-shop"
import { BarberShopItem } from "@/components/barber-shop-item"
import Footer from "@/components/footer"
import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import Image from "next/image"
import { quickSearchOptions } from "@/constants/types"
import { BookingItem } from "@/components/booking-item"
// drop-shadow-[0_0_0.5rem_#ffffff70]

export default async function Home() {
  const barberShops = await getBarberShop()
  const popularBarberShops = await getPopularBarberShop()

  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá Gustavo!</h2>
        <p>Segunda, 5 de agosto</p>

        <div className="my-6 flex items-center gap-x-2">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="mb-6 flex space-x-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              key={option.title}
              variant={"secondary"}
              className="flex items-center gap-2 px-4 py-2"
            >
              <Image
                src={option.imageUrl}
                alt={option.title}
                width={18}
                height={18}
              />
              <p>{option.title}</p>
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

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Agendamentos
        </h2>
        <BookingItem />

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
      <Footer />
    </div>
  )
}
