import type { Metadata, Viewport } from "next";
import { Inter, Permanent_Marker, Allison, Merriweather } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { LocaleProvider } from "@/components/locale-provider";
import { PageLoader } from "@/components/page-loader";
import { defaultMetadata, defaultViewport } from "@/lib/metadata";
import { defaultLocale } from "@/middleware";

// Majesty font is loaded via CSS @font-face in globals.css
// Font files should be placed in: public/fonts/Majesty-Regular.woff2 and Majesty-Bold.woff2

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-permanent-marker",
  display: "swap",
});

const allison = Allison({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-allison",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;
export const viewport: Viewport = defaultViewport;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Default to English locale for root layout
  // The [locale] layout will override this
  return (
    <html lang={defaultLocale} className={`${inter.variable} ${permanentMarker.variable} ${allison.variable} ${merriweather.variable}`} style={{ colorScheme: "dark" }}>
      <body className="font-sans">
        <PageLoader />
        <LocaleProvider />
        <SmoothScroll>
          <SiteHeader />
          <main id="main-content" className="pt-16 relative z-10 min-h-screen">
            {children}
          </main>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}

