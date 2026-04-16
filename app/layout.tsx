import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import BackgroundGradient from "@/components/BackgroundGradient";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

const GA_ID = "G-C00GCWS23J";

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
    <html lang="en" className={`${geist.variable} h-full`} suppressHydrationWarning>
      <head>
        {/* Set theme before paint to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');var d=t==='dark'||(t===null&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <BackgroundGradient />
        {children}
        <ThemeToggle />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}</Script>
      </body>
    </html>
  );
}
