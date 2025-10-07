  import type { Metadata } from "next";
import {Merriweather, Lato } from "next/font/google";
import "./styles/globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import CurrencyProvider from "./components/CurrencyWrapper";
import VehicleProvider from "./components/VehicleWrapper";
import Head from "next/head";

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "700"],
});
const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
});



export const metadata: Metadata = {
  title: "Airport To Hotels – Private Airport Transfers in Turkey",
  description: "Book your private airport to hotel transfer in Istanbul, Izmir, Antalya, and other cities in Turkey. Fast, safe, and comfortable rides.",
  keywords: [
    "airport transfer", "hotel transfer", "private driver", 
    "Istanbul airport transfer", "Izmir airport transfer", 
    "Antalya airport transfer", "Turkey transfer service", "VIP transfer"
  ],
  authors: [{ name: "AirportToHotels" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Airport To Hotels – Private Airport Transfers",
    description: "Luxury and reliable airport to hotel transfers across Turkey. Book online for fast and comfortable rides.",
    url: "https://airporttohotels.com",
    siteName: "Airport To Hotels",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Airport To Hotels – Transfer Service",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Airport To Hotels – Book Your Transfer Online",
    description: "Private airport to hotel transfer in Istanbul, Izmir, Antalya, and across Turkey. Fast, safe, and comfortable.",
    images: ["/images/og-image.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={` ${merriweather.variable} ${lato.variable} antialiased`}
      data-theme="base"
    >
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="font-lato">
        <VehicleProvider>
          <CurrencyProvider>
            <Navbar />
            {children}
          </CurrencyProvider>
        </VehicleProvider>
        <Footer />
      </body>
    </html>
  );
}