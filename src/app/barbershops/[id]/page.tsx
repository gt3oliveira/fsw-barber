import { getBarberShopById } from "@/actions/barber-shop"
import { PhoneItem } from "@/components/phone-item"
import { ServiceItem } from "@/components/service-item"
import SidebarSheet from "@/components/sidebar-sheet"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { description } from "@/constants/types"
import { BarbershopService } from "@prisma/client"
import { ArrowLeft, MapPin, MenuIcon, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

interface BarberShopPageProps {
  params: {
    id: string
  }
}

export default async function BarberShopPage({ params }: BarberShopPageProps) {
  const barberShop = await getBarberShopById(params.id)

  if (!barberShop) {
    return redirect("/")
  }

  return (
    <main>
      <div className="relative h-[250px] w-full">
        <Image
          src={barberShop.imageUrl}
          alt={barberShop.name}
          fill
          className="object-cover"
        />

        <div className="absolute top-0 flex w-full justify-between p-4">
          <Button asChild variant={"secondary"} size={"icon"}>
            <Link href={`/`}>
              <ArrowLeft size={16} />
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button size={"icon"} variant={"secondary"}>
                <MenuIcon size={16} />
              </Button>
            </SheetTrigger>
            <SidebarSheet />
          </Sheet>
        </div>
      </div>

      <div className="flex w-full flex-col gap-y-2 border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{barberShop.name}</h1>
        <p className="flex items-center gap-2 text-sm">
          <MapPin size={18} className="text-primary" />
          {barberShop.address}
        </p>
        <p className="flex items-center gap-2 text-sm">
          <Star size={18} className="fill-primary text-primary" />
          5.0 (889 avaliações)
        </p>
      </div>

      <div className="flex w-full flex-col gap-y-2 border-b border-solid p-5">
        <h2 className="text-xs font-semibold uppercase text-zinc-400">
          Sobre nós
        </h2>
        <p className="text-justify text-sm">{description}</p>
      </div>

      <div className="flex w-full flex-col gap-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-semibold uppercase text-zinc-400">
          Serviços
        </h2>

        {barberShop.service.map((service: BarbershopService) => (
          <ServiceItem
            key={service.id}
            service={service}
            barberShop={barberShop}
          />
        ))}
      </div>

      <div className="flex w-full flex-col gap-y-2 p-5">
        <h2 className="text-xs font-semibold uppercase text-zinc-400">
          Contatos
        </h2>

        {barberShop.phones.map((phone, index) => (
          <PhoneItem key={index} phone={phone} />
        ))}
      </div>
    </main>
  )
}
