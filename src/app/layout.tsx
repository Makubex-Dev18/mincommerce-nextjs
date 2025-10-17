import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/app/components/Header";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MinCommerce Next.js",
  description: "Migración Proyecto a Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* El Header se mostrará en todas las páginas */}
        <Header />
        {/* Aquí se renderizará el contenido de cada página (page.tsx) */}
        <main className="bg-bg-body min-h-screen px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
