import { getBarberShopById } from "@/actions/barber-shop"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { description } from "@/constants/types"
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

          <Button asChild variant={"secondary"} size={"icon"}>
            <Link href={`/`}>
              <MenuIcon size={16} />
            </Link>
          </Button>
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

      <div className="flex w-full flex-col gap-y-2 border-b border-solid p-5">
        <h2 className="text-xs font-semibold uppercase text-zinc-400">
          Serviços
        </h2>
      </div>

      <Footer />
    </main>
  )
}
