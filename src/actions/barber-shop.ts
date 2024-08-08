import { db } from "@/lib/prisma"

export async function getBarberShop() {
  return await db.barbershop.findMany({})
}

export async function getPopularBarberShop() {
  return await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
}

export async function getBarberShopById(id: string) {
  return await db.barbershop.findUnique({
    where: {
      id,
    },
    include: {
      service: true,
    },
  })
}

export async function getBarberShopByName(name: string) {
  return await db.barbershop.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive",
      },
    },
  })
}
