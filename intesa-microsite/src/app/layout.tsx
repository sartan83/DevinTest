import type { Metadata } from "next";
import { Outfit, Lora } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Intesa × Devin — Controlled execution at scale",
  description:
    "Executive briefing: from strategy to controlled execution at scale for Intesa Sanpaolo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${lora.variable} antialiased bg-brand-green text-brand-ivory`}
      >
        {children}
      </body>
    </html>
  );
}
