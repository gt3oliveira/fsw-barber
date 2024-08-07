import { BarbershopService } from "@prisma/client"
import Image from "next/image"
import React from "react"
import { Button } from "./ui/button"
import { formatPrice } from "@/hooks/format-price"
import { Card, CardContent } from "./ui/card"

interface ServiceItemProps {
  service: BarbershopService
}

export function ServiceItem({ service }: ServiceItemProps) {
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
            <Button variant={"secondary"} size={"sm"}>
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
