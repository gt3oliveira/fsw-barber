import Header from "@/components/Header"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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

        <Card className="my-6">
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
      </div>
    </div>
  )
}
