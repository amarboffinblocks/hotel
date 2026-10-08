import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Oxanium } from "next/font/google";

import { siteConfig } from "@/config/site";
import { AppQueryProvider } from "@/features/admin/api/query-provider";

import "./globals.css";
import { cn } from "@/lib/utils";

const oxanium = Oxanium({ subsets: ["latin"], variable: "--font-sans" });

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.fullName,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        plusJakarta.variable,
        playfair.variable,
        "font-sans",
        oxanium.variable
      )}
    >
      <body className="flex min-h-full flex-col font-sans">
        <AppQueryProvider>{children}</AppQueryProvider>
      </body>
    </html>
  );
}
