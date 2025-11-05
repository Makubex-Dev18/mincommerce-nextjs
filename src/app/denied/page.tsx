import { auth } from "@/auth"
import Link from "next/link"

export default async function DeniedPage() {
  const session = await auth()

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Acceso Denegado
        </h1>
        
        <div className="mb-4 p-4 bg-red-50 rounded-md">
          <p className="text-gray-700 mb-2">
            No tienes los permisos necesarios para acceder a esta página.
          </p>
          <p className="text-gray-600">
            Tu rol actual: <span className="font-semibold">{session?.user?.role || 'No definido'}</span>
          </p>
        </div>

        <div className="space-y-4">
          <Link 
            href="/"
            className="block w-full text-center bg-primary-600 text-white py-2 px-4 rounded hover:bg-primary-700 transition-colors"
          >
            Volver al Inicio
          </Link>
          
          <Link
            href="/profile"
            className="block w-full text-center bg-gray-100 text-gray-700 py-2 px-4 rounded hover:bg-gray-200 transition-colors"
          >
            Ir a mi Perfil
          </Link>
        </div>
      </div>
    </div>
  )
}