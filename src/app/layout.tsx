import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Header from "./products/components/Header"
import Footer from "./products/components/Footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "TranspNet Frontend Test",
  description: "Aplicação desenvolvida para o desafio técnico",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-black text-white antialiased flex flex-col min-h-screen`}>
        <Header />

        {/* O conteúdo ocupa o espaço restante e empurra o footer para o fim */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-16 pt-64 md:pt-48">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}
