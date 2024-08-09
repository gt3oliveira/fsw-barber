import React from "react"
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import Image from "next/image"
import { signIn } from "next-auth/react"

export default function SignInDialog() {
  const handleLoginWithGoogle = () => signIn("google")

  return (
    <>
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
        onClick={handleLoginWithGoogle}
      >
        <Image
          src="/google.svg"
          alt="Fazer login com o Google"
          width={18}
          height={18}
        />
        Google
      </Button>
    </>
  )
}
