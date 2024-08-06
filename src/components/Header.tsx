import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5">
        <Image src="/logo.png" alt="FSW Barber" width={150} height={150} />
        <Button size={"icon"} variant={"outline"}>
          <MenuIcon />
        </Button>
      </CardContent>
    </Card>
  )
}

export default Header
