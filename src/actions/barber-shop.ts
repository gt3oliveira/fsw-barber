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

export async function getBarberShopByNameOrService(
  search?: string,
  service?: string,
) {
  return await db.barbershop.findMany({
    where: {
      OR: [
        search
          ? {
              name: {
                contains: search,
                mode: "insensitive",
              },
            }
          : {},
        service
          ? {
              service: {
                some: {
                  name: {
                    contains: service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  })
}
