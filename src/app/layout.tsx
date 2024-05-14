import { cn } from "@/lib/utils"
import { Inter as FontSans } from "next/font/google"
import "./globals.css"

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" })

export const metadata = {
  title: {
    default: "Lovecake * For Pastry Chefs like you",
    template: "%s | Lovecake",
  },
  description:
    "You can create all your recipes and offer them with Lovecake. Lovecake is a platform that allows you to create and offer your recipes as a service.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}
