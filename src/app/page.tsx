import { getBarberShop, getPopularBarberShop } from "@/actions/barber-shop"
import { BarberShopItem } from "@/components/barber-shop-item"
import Footer from "@/components/footer"
import Header from "@/components/Header"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
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
          <Button
            variant={"secondary"}
            className="flex items-center gap-2 px-4 py-2"
          >
            <Image src="/cabelo.svg" alt="cabelo" width={18} height={18} />
            <p>Cabelo</p>
          </Button>
          <Button
            variant={"secondary"}
            className="flex items-center gap-2 px-4 py-2"
          >
            <Image src="/Barba.svg" alt="barba" width={18} height={18} />
            <p>Barba</p>
          </Button>
          <Button
            variant={"secondary"}
            className="flex items-center gap-2 px-4 py-2"
          >
            <Image
              src="/acabamento.svg"
              alt="acabamento"
              width={18}
              height={18}
            />
            <p>Acabamento</p>
          </Button>
          <Button
            variant={"secondary"}
            className="flex items-center gap-2 px-4 py-2"
          >
            <Image src="/massagem.svg" alt="massagem" width={18} height={18} />
            <p>Massagem</p>
          </Button>
          <Button
            variant={"secondary"}
            className="flex items-center gap-2 px-4 py-2"
          >
            <Image
              src="/sobrancelha.svg"
              alt="sobrancelha"
              width={18}
              height={18}
            />
            <p>Sobrancelha</p>
          </Button>
          <Button
            variant={"secondary"}
            className="flex items-center gap-2 px-4 py-2"
          >
            <Image
              src="/hidratacao.svg"
              alt="hidratacao"
              width={18}
              height={18}
            />
            <p>Hidratação</p>
          </Button>
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

        <Card className="border-l-8 border-l-primary">
          <CardContent className="flex justify-between pb-0">
            <div className="flex flex-col gap-2 py-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-semibold">Corte de cabelo</h3>

              <div className="flex items-center gap-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"
                    alt="Avatar"
                  />
                </Avatar>
                <p className="text-sm">Betinho Barber</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-y-2 border-l-2 border-solid pl-6">
              <p className="text-sm">Agosto</p>
              <p className="text-2xl">10</p>
              <p className="text-sm">10:00</p>
            </div>
          </CardContent>
        </Card>

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
