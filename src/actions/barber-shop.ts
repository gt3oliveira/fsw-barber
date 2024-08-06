import { db } from "@/lib/prisma"

export async function getBarberShop() {
  return await db.barbershop.findMany({})
}
