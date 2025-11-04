/*
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
  const session = await auth()

 if (!session) {
    redirect("/api/auth/signin")
  }

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Perfil del Usuario</h1>
        
        <div className="space-y-2">
          {session.user?.image && (
            <div className="flex justify-center">
              <img 
                src={session.user.image} 
                alt="Profile" 
                className="w-24 h-24 rounded-full"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <p className="text-gray-600">Nombre:</p>
            <p className="font-semibold">{session.user?.name}</p>
          </div>
           
          <div className="space-y-2">
            <p className="text-gray-600">Id:</p>
            <p className="font-semibold">{session.user?.id}</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-gray-600">Email:</p>
            <p className="font-semibold">{session.user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
*/

import { auth } from "@/auth";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    return (
      <main className="flex items-center justify-center">
        <p className="text-xl text-red-800">No autorizado</p>
      </main>
    );
  }

  return (

    <section className="h-[14vh] flex flex-col items-center justify-center">
         {session.user?.image && (
            <div className="flex justify-center">
              <img 
                src={session.user.image} 
                alt="Profile" 
                className="w-24 h-24 rounded-full"
              />
            </div>
          )}
          
      <h2 className="text-xl">Perfil del Usuario</h2>
      <p className="font-bold"> {session.user?.name} / {session.user?.email}</p>
      <p className="font-bold">{session.user?.role}</p>
    
    </section>
  );
}
