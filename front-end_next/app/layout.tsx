import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Estrela Guia",
  description: "Esse é um blog sobre a estrela guia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/images/star.ico" />
      <body className={`${inter.className} overflow-x-hidden`}>{children}</body>
    </html>
  );
}
