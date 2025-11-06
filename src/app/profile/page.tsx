
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Clock, User, Mail, Shield } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    //redirect("/api/auth/signin");
    return(
          <main className="flex items-center justify-center">
        <p className="text-xl text-red-800 font-bold">No autorizado</p>
      </main>)
  }

  return (
    <div className="container mx-auto py-4 px-4">
      <Card className="max-w-2xl mx-auto p-5 h-120 bg-gradient-to-r from-[#4B79A1] to-[#283E51]">
        <div className="flex flex-col items-center space-y-4">
          {session.user?.image && (
            <div className="relative">
              <img 
                src={session.user.image}
                alt="Profile" 
                className="w-32 h-32 rounded-full border-4 border-primary-500"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
          )}
          
          <h1 className="text-3xl font-bold text-text-primary">
            {session.user?.name}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-2">             
            <InfoCard icon={<Mail />} title="Email" value={session.user?.email} />
            <InfoCard icon={<Shield />} title="Rol" value={session.user?.role} />
            <InfoCard icon={<Clock />} title="Miembro desde" value={new Date().toLocaleDateString()} />
          </div>

          <div className="flex gap-4 mt-6">
            <Button >
              <Link href="/">Ir al Catálogo</Link>
            </Button>
            {session.user?.role === "admin" && (
              <Button variant="secondary" >
                <Link href="/admin/users">Panel Admin</Link>
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

function InfoCard({ icon, title, value }: { icon: React.ReactNode, title: string, value?: string }) {
  return (
    <div className="flex items-center space-x-3 p-3 bg-bg-card rounded-lg border border-border-default">
      <div className="text-primary-500">
        {icon}
      </div>
      <div>
        <p className="text-sm text-text-secondary">{title}</p>
        <p className="font-medium text-text-primary">{value}</p>
      </div>
    </div>
  );
}
/*

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
                src={`${session.user.image}`}
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
*/