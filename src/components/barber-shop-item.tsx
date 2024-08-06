import { Barbershop } from "@prisma/client"
import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { StarIcon } from "lucide-react"

interface BarberShopItemProps {
  barberShop: Barbershop
}

export function BarberShopItem({ barberShop }: BarberShopItemProps) {
  return (
    <Card className="min-w-[167px] rounded-2xl">
      <CardContent className="flex flex-col gap-2 p-0">
        <div className="relative h-[159px] w-full">
          <Image
            src={barberShop.imageUrl}
            alt={barberShop.name}
            fill
            className="rounded-t-2xl object-cover p-1"
          />
          <Badge
            variant={"secondary"}
            className="absolute left-2 top-2 space-x-1"
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <span className="text-xs font-semibold">5.0</span>
          </Badge>
        </div>

        <div className="px-2 py-3">
          <h3 className="truncate font-semibold">{barberShop.name}</h3>
          <p className="truncate text-sm text-gray-400">{barberShop.address}</p>
          <Button variant={"secondary"} className="mt-3 w-full">
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
