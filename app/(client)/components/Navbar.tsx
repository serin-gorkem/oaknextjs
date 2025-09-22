"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import CurrencyDropdown from "./CurrencyDropdown";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isBookingPage = pathname !== "/";

  const handleNavigateToHome = () => router.push("/");

  return (
    <div className="mb-5 absolute z-100 top-0 w-full">
      <PageNav handleNavigateToHome={handleNavigateToHome} />
      {isBookingPage ? <BookingNav /> : <>{/* original desktop/mobile */}<MobileNav /><DesktopNav /></>}
    </div>
  );
}

// ---------------------- PageNav ----------------------
function PageNav({ handleNavigateToHome }: { handleNavigateToHome: () => void }) {
  const [showNav, setShowNav] = useState("opacity-0 pointer-events-none");
  const lastScrollY = useRef(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // hydration safe
    lastScrollY.current = window.pageYOffset;

    const handleNavBehavior = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 500) setShowNav("opacity-0 pointer-events-none");
      else if (currentScrollY < lastScrollY.current)
        setShowNav("opacity-100 pointer-events-all z-20");
      else setShowNav("opacity-0 pointer-events-none");

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleNavBehavior);
    return () => window.removeEventListener("scroll", handleNavBehavior);
  }, []);

  if (!isClient) return null; // prevent SSR mismatch

  return (
    <nav
      className={`px-2 p-8 ${showNav} duration-200 fixed w-full flex bg-black/10 backdrop-blur-md top-0 -z-10`}
    >
      <ul className="flex flex-col md:flex-row md:justify-between gap-3 lg:p-0 lg:max-w-9/12 mx-auto w-full">
        <li onClick={handleNavigateToHome} className="cursor-pointer">
          <a href="/">
            <Image
              src="/images/logos/Logo.png"
              width={100}
              height={100}
              alt="Website Logo"
              aria-label="Book now button"
              className="w-36 p-2 hover:shadow-none hover:text-base-100"
            />
          </a>
        </li>
        <li className="flex items-center gap-4 w-fit cursor-pointer">
          <button
            aria-label="Book button"
            className="btn btn-primary w-30 lg:w-36 hover:bg-white hover:text-primary"
          >
            Book Now
          </button>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Go back to top button"
            className="btn w-30 lg:w-36 btn-primary hover:bg-white hover:text-primary"
          >
            Back To top
          </button>
          <CurrencyDropdown />
        </li>
      </ul>
    </nav>
  );
}

// ---------------------- MobileNav ----------------------
function MobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (bool?: boolean) => setIsMenuOpen(bool ?? !isMenuOpen);

  return (
    <nav className="flex flex-col gap-2 z-20">
      {isMenuOpen ? (
        <div className="h-[25rem] bg-base-100 flex flex-col sm:hidden">
          {/* same as your original */}
          <ul className="p-2 flex justify-between items-center">
            <li>
              <a href="/">
                <Image
                  src="/images/logos/Logo.png"
                  width={100}
                  height={100}
                  alt="Website Logo"
                  aria-label="Book now button"
                  className="w-36 p-2 hover:shadow-none hover:text-base-100"
                />
              </a>
            </li>
            <li className="flex items-center gap-4">
              {/* Whatsapp Icon */}
              <a href="https://api.whatsapp.com/send?phone=905540161923" aria-label="whatsapp link">
                {/* SVG same as before */}
              </a>
              {/* Close Icon */}
              <div onClick={() => toggleMenu(false)}>
                {/* SVG same as before */}
              </div>
            </li>
          </ul>
          <div className="bg-base-300 h-11/12 m-2 p-4">
            <ul className="flex flex-col h-full justify-between text-primary">
              {menuItems()}
            </ul>
          </div>
          <a href="https://www.toursofyou.com/">
            <Image
              src="/images/logos/ToursOfYou.webp"
              width={100}
              height={100}
              alt="Website Logo"
              aria-label="Book now button"
              className="w-36 p-2 hover:shadow-none hover:text-base-100"
            />
          </a>
        </div>
      ) : (
        <div className="sm:hidden">
          {/* compact header */}
        </div>
      )}
    </nav>
  );
}

// ---------------------- DesktopNav ----------------------
function DesktopNav() {
  return (
    <nav className="hidden sm:flex sm:flex-col pt-5 items-center z-20 gap-6 w-full lg:px-0 sm:px-4 xl:max-w-9/12 lg:max-w-11/12 mx-auto">
      <ul className="flex justify-between items-center w-full">
        <li>
          <a href="/">
            <Image
              src="/images/logos/Logo_W.png"
              width={300}
              height={300}
              alt="Website Logo"
              aria-label="Book now button"
              className="w-48 p-2 hover:shadow-none hover:text-base-100"
            />
          </a>
        </li>
        <li className="flex items-center gap-4 w-fit cursor-pointer">
          <a href="https://www.toursofyou.com/">
            <Image
              src="/images/logos/ToursOfYou.webp"
              width={300}
              height={300}
              alt="Tours of you Logo"
              aria-label="Book now button"
              className="w-36 p-2 hover:shadow-none hover:text-base-100"
            />
          </a>
          <button
            aria-label="Book now button"
            className="btn w-36 hover:bg-primary hover:border-primary hover:shadow-none hover:text-base-100"
          >
            Book Now
          </button>
        </li>
      </ul>
      <div className="flex flex-col items-center w-full gap-3">
        <hr className="w-full text-base-100"></hr>
        <ul className="text-base-100 flex justify-evenly w-full">{menuItems()}</ul>
        <hr className="w-full text-base-100"></hr>
      </div>
    </nav>
  );
}

// ---------------------- BookingNav ----------------------
function BookingNav() {
  return (
    <nav className="flex flex-col z-20 lg:px-0 sm:px-4 xl:max-w-9/12 lg:max-w-11/12 mx-auto">
      <div>
        <ul className="p-2 sm:px-0 flex justify-between items-center">
          <li>
            <a href="/">
              <Image
                src="/images/logos/Logo.png"
                width={100}
                height={100}
                alt="Website Logo"
                aria-label="Book now button"
                className="w-36 p-2 hover:shadow-none hover:text-base-100"
              />
            </a>
          </li>
          <li className="flex cursor-pointer items-center gap-4">
            <CurrencyDropdown />
          </li>
        </ul>
        <hr className="mx-2 text-primary"></hr>
      </div>
    </nav>
  );
}

// ---------------------- Menu Items ----------------------
function menuItems() {
  const items = [
    ["Booking", "/booking"],
    ["Who we are", "#us"],
    ["Our Vehicles", "#vehicles"],
    ["Reviews", "#reviews"],
    ["How to book your ride", "#steps"],
    ["FAQ", "#FAQ"],
    ["Contact", "#Contact"],
  ];

  return items.map(([text, link]) => (
    <li
      key={text}
      className="font-heading transition-all text-xl lg:text-[1.25rem] md:text-base active:text-warning hover:text-warning"
    >
      <a href={link} aria-label={`Scroll to the ${text} section.`}>
        {text}
      </a>
    </li>
  ));
}
