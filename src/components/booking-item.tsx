import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarImage } from "./ui/avatar"

export function BookingItem() {
  return (
    <Card className="border-l-8 border-l-primary">
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
  )
}
