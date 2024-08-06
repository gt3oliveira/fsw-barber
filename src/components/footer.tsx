import { Card, CardContent } from "./ui/card"

const Footer = () => {
  return (
    <Card className="mt-6 rounded-none">
      <CardContent className="py-4">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-bold">FSW Barber</span>. Todos os direitos
          reservados.
        </p>
      </CardContent>
    </Card>
  )
}

export default Footer
