//Este boton dira: Ingresar con google (en caso no haya seccion)
// o dira : Hola , luis cerrar seccion (en caso haya seccion iniciada)

"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link";
import { Button } from "@/components/ui/button";


export default function AuthButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        <Link href={"/profile"} className="text-xs border-1 rounded-lg px-6 h-8 flex items-center text-violet-300">{session.user?.name}</Link>
        <Button variant="destructive" onClick={() => signOut()}>Cerrar sesión</Button>
      </>
    )
  }

  return <Button onClick={() => signIn("google")}>Iniciar con Google</Button>
}