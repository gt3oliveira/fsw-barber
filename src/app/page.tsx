import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import Image from "next/image"
// drop-shadow-[0_0_0.5rem_#ffffff70]

export default function Home() {
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

        <div className="relative h-[150px] w-full">
          <Image
            src="/banner-01.png"
            alt="Agende nos melhores com FSW Barber"
            fill
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  )
}
