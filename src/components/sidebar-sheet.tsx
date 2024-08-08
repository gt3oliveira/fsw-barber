import Link from "next/link"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { quickSearchOptions } from "@/constants/types"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"

export default function SidebarSheet() {
  return (
    <SheetContent className="overflow-y-auto [&::-webkit-scrollbar]:hidden">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center gap-2 border-b border-solid py-5">
        <div className="flex w-full items-center justify-between">
          <h2 className="font-bold">Bem-vindo, faça o seu login!</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button size={"icon"}>
                <LogInIcon size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Faça login na plataforma</DialogTitle>
                <DialogDescription>
                  Conecte-se usando sua conta do Google.
                </DialogDescription>
              </DialogHeader>
              <Button
                variant={"outline"}
                size={"sm"}
                className="gap-x-2 font-bold"
              >
                <Image
                  src="/google.svg"
                  alt="Fazer login com o Google"
                  width={18}
                  height={18}
                />
                Google
              </Button>
            </DialogContent>
          </Dialog>
        </div>
        {/* <Avatar>
          <AvatarImage src="https://avatars.githubusercontent.com/u/94011588?v=4" />
        </Avatar>
        <div className="flex flex-col">
          <span className="font-bold">Gustavo Tavares</span>
          <span className="text-xs">gt3oliveira@next.com</span>
        </div> */}
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
  )
}
