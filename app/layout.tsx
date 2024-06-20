import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Providers } from "@/redux/provider";

const inter = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coin Crunch",
  description:
    "Get all the information you need to know about your favourite coin and also get coin tips",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main className="max-width">
            <Header />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
