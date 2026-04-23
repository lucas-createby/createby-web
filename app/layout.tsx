import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import Script from "next/script";
import BackgroundGradient from "@/components/BackgroundGradient";
import ThemeToggle from "@/components/ThemeToggle";
import ScrollAnimations from "@/components/ScrollAnimations";
import "./globals.css";

const GA_ID = "G-C00GCWS23J";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const description =
  "create by™ brings 20+ years of design expertise to create innovative, sustainable digital solutions for brands and ventures, transforming ideas into compelling products and services that exceed client and customer needs.";

export const metadata: Metadata = {
  title: "create by™ | Cueni AS",
  description,
  metadataBase: new URL("https://www.createby.no"),
  icons: {
    icon: [
      { url: "/media/favicon-light.png", media: "(prefers-color-scheme: light)" },
      { url: "/media/favicon-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/media/apple-touch-icon.png",
  },
  openGraph: {
    title: "create by™ | Cueni AS",
    description,
    url: "https://www.createby.no",
    siteName: "create by™",
    locale: "en_US",
    type: "website",
    images: [{ url: "/media/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "create by™ | Cueni AS",
    description,
    images: ["/media/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolageGrotesque.variable} ${manrope.variable} h-full`} suppressHydrationWarning>
      <head>
        {/* Set theme + enable JS-gated animation hidden states before paint.
            If this inline script fails for any reason, .js is never added
            → CSS keeps content fully visible (fallback by default). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{document.documentElement.classList.add('js');var t=localStorage.getItem('theme');var d=t==='dark'||(t===null&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <BackgroundGradient />
        {children}
        <ThemeToggle />
        <ScrollAnimations />
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
