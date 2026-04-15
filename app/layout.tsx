import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "create by™ | Cueni AS",
  description:
    "create by™ brings 20+ years of design expertise to create innovative, sustainable digital solutions for brands and ventures, transforming ideas into compelling products and services.",
  metadataBase: new URL("https://www.createby.no"),
  openGraph: {
    title: "create by™ | Cueni AS",
    description:
      "create by™ brings 20+ years of design expertise to create innovative, sustainable digital solutions.",
    url: "https://www.createby.no",
    siteName: "create by™",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
