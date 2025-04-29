import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/styles";

const font = Karla({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Frontend Mentor | Contact form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("antialiased h-screen", font.className)}>
        {children}
      </body>
    </html>
  );
}
