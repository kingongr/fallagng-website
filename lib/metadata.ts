import { Metadata, Viewport } from "next";

export const defaultMetadata: Metadata = {
  // metadataBase removed - Next.js will infer from request host
  // This allows ngrok and other proxies to work correctly
  title: {
    default: "FALLAGNG",
    template: "%s | FALLAGNG",
  },
  description:
    "A music collective pushing boundaries and creating sounds that resonate. Stream our latest releases on Spotify, Apple Music, YouTube, and more.",
  keywords: ["music", "electronic", "collective", "band", "music collective", "electronic music"],
  authors: [{ name: "FALLAGNG" }],
  creator: "FALLAGNG",
  publisher: "FALLAGNG",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "FALLAGNG",
    title: "FALLAGNG",
    description:
      "A music collective pushing boundaries and creating sounds that resonate.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FALLAGNG",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FALLAGNG",
    description:
      "A music collective pushing boundaries and creating sounds that resonate.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const defaultViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0A0B0D",
  colorScheme: "dark",
};

