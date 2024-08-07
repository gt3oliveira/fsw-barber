"use client"
import { Smartphone } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"

interface PhoneItemProps {
  phone: string
}

export function PhoneItem({ phone }: PhoneItemProps) {
  function handleCopyPhone(phone: string) {
    navigator.clipboard.writeText(phone)
    toast.success("Número copiado!", { icon: "✔", position: "bottom-center" })
  }

  return (
    <div key={phone} className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Smartphone size={18} />
        <p className="text-sm">{phone}</p>
      </div>

      <Button
        variant={"outline"}
        size={"sm"}
        onClick={() => handleCopyPhone(phone)}
      >
        Copiar
      </Button>
    </div>
  )
}
