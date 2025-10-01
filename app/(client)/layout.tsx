  import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import CurrencyProvider from "./components/CurrencyWrapper";
import VehicleProvider from "./components/VehicleWrapper";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airport To Hotels",
  description: "Book your private transfer between airport and hotel easily.",
  keywords: ["airport transfer", "hotel transfer", "private driver"],
  authors: [{ name: "AirportToHotels" }],
  icons: {
    icon: "/favicon.ico", // favicon için public/favicon.ico
  },
  openGraph: {
    title: "Airport To Hotels",
    description: "Luxury transfer service between airport and hotels.",
    url: "https://airporttohotels.com",
    siteName: "Airport To Hotels",
    images: [
      {
        url: "/images/og-image.png", // public/images/og-image.png
        width: 1200,
        height: 630,
        alt: "Airport To Hotels",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Airport To Hotels",
    description: "Book your airport to hotel transfer online.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="base">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <VehicleProvider>
          <CurrencyProvider>
            <Navbar/>
            {children}
          </CurrencyProvider>
        </VehicleProvider>
        <Footer/>
      </body>
    </html>
  );
}