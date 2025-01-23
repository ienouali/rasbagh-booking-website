import {ReactNode} from "react";
import {Nunito} from "next/font/google";
import "@/app/_styles/globals.css";
import Header from "@/app/_components/Header";
import {ReservationProvider} from "@/app/_components/ReservationContext";

const NunitoFont = Nunito({
    subsets: ["latin"],
    display: "swap"
});
export const metadata = {
 // title: 'Oasis Hotel',
  title: {
      template: "%s - The Oasis Hotel",
      default: "The Oasis Hotel"
  },
  description: "Oasis it's a Luxurious and the most beautiful hotel, located in the best place of the world"
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
    const layoutClassNames = `${NunitoFont.className} relative antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col`;
   return (
    <html lang="en">
      <body className={layoutClassNames}>
          <Header />
          <div className="flex-1 px-8 py-12 grid">
              <main className="max-w-7xl mx-auto w-full">
                  <ReservationProvider>
                      {children}
                  </ReservationProvider>
              </main>
          </div>
      </body>
    </html>
  )
}
