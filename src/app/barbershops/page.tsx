import { getBarberShopByNameOrService } from "@/actions/barber-shop"
import { BarberShopItem } from "@/components/barber-shop-item"
import Header from "@/components/Header"
import { InputSearch } from "@/components/input-search"

interface BarberShopsPageProps {
  searchParams: {
    search?: string
    service?: string
  }
}

export default async function BarberShopsPage({
  searchParams,
}: BarberShopsPageProps) {
  const barberShops = await getBarberShopByNameOrService(
    searchParams.search,
    searchParams.service,
  )

  const title = searchParams?.service || searchParams.search

  return (
    <>
      <Header />
      <div className="mt-6 px-5">
        <InputSearch />
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          {barberShops?.length} Resultado(s) para{" "}
          <span className="text-white">&quot;{title}&quot;</span>
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {barberShops &&
            barberShops.map((barberShop) => (
              <BarberShopItem key={barberShop.id} barberShop={barberShop} />
            ))}
        </div>
      </div>
    </>
  )
}
