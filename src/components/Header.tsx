import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import {
  CalendarIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  User2,
} from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { quickSearchOptions } from "@/constants/types"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import Link from "next/link"

const Header = () => {
  return (
    <Card className="rounded-none">
      <CardContent className="flex items-center justify-between p-5">
        <Image src="/logo.png" alt="FSW Barber" width={150} height={150} />

        <Sheet>
          <SheetTrigger asChild>
            <Button size={"icon"} variant={"outline"}>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto [&::-webkit-scrollbar]:hidden">
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="flex items-center gap-2 border-b border-solid py-5">
              <Avatar>
                <AvatarImage src="https://avatars.githubusercontent.com/u/94011588?v=4" />
              </Avatar>
              <div className="flex flex-col">
                <span className="font-bold">Gustavo Tavares</span>
                <span className="text-xs">gt3oliveira@next.com</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 border-b border-solid py-5">
              <SheetClose asChild>
                <Button className="justify-start gap-2" asChild>
                  <Link href={`/`}>
                    <HomeIcon size={16} />
                    Inicio
                  </Link>
                </Button>
              </SheetClose>
              <Button className="justify-start gap-2" variant={"ghost"}>
                <CalendarIcon size={16} />
                Agendamentos
              </Button>
            </div>

            <div className="flex flex-col gap-2 border-b border-solid py-5">
              {quickSearchOptions.map((option) => (
                <Button
                  key={option.title}
                  className="justify-start gap-2"
                  variant={"ghost"}
                >
                  <Image
                    src={option.imageUrl}
                    alt={option.title}
                    width={16}
                    height={16}
                  />
                  {option.title}
                </Button>
              ))}
            </div>

            <div className="flex flex-col gap-2 py-5">
              <Button
                className="justify-start gap-2 text-red-500 hover:text-red-700"
                variant={"ghost"}
              >
                <LogOutIcon size={16} />
                Sair da conta
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
