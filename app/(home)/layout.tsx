import "../globals.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar isBookingPage={false} />
      {children}
      <Footer />
    </div>
  );
}
