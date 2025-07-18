"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CurrencyDropdown from "./CurrencyDropdown";
import Image from "next/image";

function Navbar() {
  const pathname = usePathname();
  const isBookingPage = pathname !== "/";
  return (
    <div className="mb-5 absolute z-100 top-0 w-full">
      <PageNav />
      {isBookingPage ? (
        <BookingNav />
      ) : (
        <>
          <MobileNav />
          <DesktopNav />
        </>
      )}
    </div>
  );
}

function PageNav() {
  const [lastScrollY, setLastScrollY] = useState<number>(
    typeof window !== "undefined" ? window.pageYOffset : 0
  );
  const [showNav, setShowNav] = useState<string>(
    "opacity-0 pointer-events-none"
  );

  const handleNavBehavior = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY < 1000) {
      setShowNav("opacity-0 pointer-events-none");
    } else if (currentScrollY < lastScrollY) {
      setShowNav("opacity-100 pointer-events-all z-20");
    } else {
      setShowNav("opacity-0 pointer-events-none");
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleNavBehavior);
    return () => window.removeEventListener("scroll", handleNavBehavior);
  }, [lastScrollY]);
  return (
    <nav
      className={`px-2 p-8  ${showNav} duration-200  opacity-0 fixed w-full flex bg-black/10 backdrop-blur-md top-0 -z-10 `}
    >
      <ul className="flex flex-col md:flex-row md:justify-between gap-3 lg:p-0 lg:max-w-9/12 mx-auto w-full  ">
        <li className=" cursor-pointer">
          <h1 className="text-primary text-3xl hover:text-warning transition-all ">
            Airport to Hotels
          </h1>
        </li>
        <li className="flex items-center gap-4 w-fit cursor-pointer">
          <CurrencyDropdown/>
          <button
            aria-label="Book button"
            className="btn btn-primary w-30 lg:w-36 hover:bg-white hover:text-primary"
          >
            Book Now
          </button>
          <button
            onClick={() =>
              typeof window.scrollTo({ top: 0, behavior: "smooth" })
            }
            aria-label="Go back to top button"
            className="btn w-30 lg:w-36 btn-primary hover:bg-white hover:text-primary"
          >
            Back To top
          </button>
          {/* <CurrencyDropdown /> */}
        </li>
      </ul>
    </nav>
  );
}

function MobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu(bool: boolean) {
    setIsMenuOpen(bool);
  }

  return (
    <nav className="flex flex-col gap-2 z-20 ">
      {isMenuOpen ? (
        <div className="h-[25rem] bg-base-100 flex flex-col sm:hidden">
          <ul className=" p-2 flex justify-between items-center">
            <li>
              <a href="/">
                <h1 className="text-base-100 text-3xl hover:text-warning transition-all ">
                  Airport to Hotels
                </h1>
              </a>
            </li>
            <li className="flex items-center gap-4">
              {/* Whatsapp Icon */}
              <a
                href="https://api.whatsapp.com/send?phone=905540161923"
                aria-label="whatsapp link"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-8 aspect-square p-1.5 bg-white rounded-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.50002 12C3.50002 7.30558 7.3056 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C10.3278 20.5 8.77127 20.0182 7.45798 19.1861C7.21357 19.0313 6.91408 18.9899 6.63684 19.0726L3.75769 19.9319L4.84173 17.3953C4.96986 17.0955 4.94379 16.7521 4.77187 16.4751C3.9657 15.176 3.50002 13.6439 3.50002 12ZM12 1.5C6.20103 1.5 1.50002 6.20101 1.50002 12C1.50002 13.8381 1.97316 15.5683 2.80465 17.0727L1.08047 21.107C0.928048 21.4637 0.99561 21.8763 1.25382 22.1657C1.51203 22.4552 1.91432 22.5692 2.28599 22.4582L6.78541 21.1155C8.32245 21.9965 10.1037 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5ZM14.2925 14.1824L12.9783 15.1081C12.3628 14.7575 11.6823 14.2681 10.9997 13.5855C10.2901 12.8759 9.76402 12.1433 9.37612 11.4713L10.2113 10.7624C10.5697 10.4582 10.6678 9.94533 10.447 9.53028L9.38284 7.53028C9.23954 7.26097 8.98116 7.0718 8.68115 7.01654C8.38113 6.96129 8.07231 7.046 7.84247 7.24659L7.52696 7.52195C6.76823 8.18414 6.3195 9.2723 6.69141 10.3741C7.07698 11.5163 7.89983 13.314 9.58552 14.9997C11.3991 16.8133 13.2413 17.5275 14.3186 17.8049C15.1866 18.0283 16.008 17.7288 16.5868 17.2572L17.1783 16.7752C17.4313 16.5691 17.5678 16.2524 17.544 15.9269C17.5201 15.6014 17.3389 15.308 17.0585 15.1409L15.3802 14.1409C15.0412 13.939 14.6152 13.9552 14.2925 14.1824Z"
                      fill="#1E272E"
                    ></path>
                  </g>
                </svg>
              </a>
              {/* Close Icon */}
              <div onClick={() => toggleMenu(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </li>
          </ul>
          <div className=" bg-base-300 h-11/12 m-2 p-4">
            <ul className="flex flex-col h-full justify-between text-primary">
              {menuItem("Booking", "/booking")}
              {menuItem("Who we are", "#us")}
              {menuItem("Our Vehicles", "#vehicles")}
              {menuItem("Reviews", "#reviews")}
              {menuItem("How to book your ride", "#steps")}
              {menuItem("FAQ", "#FAQ")}
              {menuItem("Contact", "#Contact")}
            </ul>
          </div>
          <Image
            src="/images/logos/ToursOfYou.webp"
            width={100}
            height={100}
            alt="Tours of you logo"
            aria-label="Book now button"
            className="w-36 p-2  hover:shadow-none hover:text-base-100"
          ></Image>
        </div>
      ) : (
        <div className="sm:hidden ">
          <ul className="p-2  flex justify-between items-center">
            <li>
              <a href="#">
                <p className=" font-heading text-white text-xl">
                  Airport to Hotels
                </p>
              </a>
            </li>
            <li className="flex items-center gap-4">
              {/* Whatsapp Icon */}
              <a
                href="https://api.whatsapp.com/send?phone=905540161923"
                aria-label="whatsapp link"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-8 aspect-square p-1.5 bg-white rounded-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.50002 12C3.50002 7.30558 7.3056 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C10.3278 20.5 8.77127 20.0182 7.45798 19.1861C7.21357 19.0313 6.91408 18.9899 6.63684 19.0726L3.75769 19.9319L4.84173 17.3953C4.96986 17.0955 4.94379 16.7521 4.77187 16.4751C3.9657 15.176 3.50002 13.6439 3.50002 12ZM12 1.5C6.20103 1.5 1.50002 6.20101 1.50002 12C1.50002 13.8381 1.97316 15.5683 2.80465 17.0727L1.08047 21.107C0.928048 21.4637 0.99561 21.8763 1.25382 22.1657C1.51203 22.4552 1.91432 22.5692 2.28599 22.4582L6.78541 21.1155C8.32245 21.9965 10.1037 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5ZM14.2925 14.1824L12.9783 15.1081C12.3628 14.7575 11.6823 14.2681 10.9997 13.5855C10.2901 12.8759 9.76402 12.1433 9.37612 11.4713L10.2113 10.7624C10.5697 10.4582 10.6678 9.94533 10.447 9.53028L9.38284 7.53028C9.23954 7.26097 8.98116 7.0718 8.68115 7.01654C8.38113 6.96129 8.07231 7.046 7.84247 7.24659L7.52696 7.52195C6.76823 8.18414 6.3195 9.2723 6.69141 10.3741C7.07698 11.5163 7.89983 13.314 9.58552 14.9997C11.3991 16.8133 13.2413 17.5275 14.3186 17.8049C15.1866 18.0283 16.008 17.7288 16.5868 17.2572L17.1783 16.7752C17.4313 16.5691 17.5678 16.2524 17.544 15.9269C17.5201 15.6014 17.3389 15.308 17.0585 15.1409L15.3802 14.1409C15.0412 13.939 14.6152 13.9552 14.2925 14.1824Z"
                      fill="#1E272E"
                    ></path>
                  </g>
                </svg>
              </a>
              {/* Hamburger Icon */}
              <div className="sm:hidden" onClick={() => toggleMenu(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#ffffff"
                  className=" cursor-pointer w-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </div>
            </li>
          </ul>
          <hr className="mx-2 text-white"></hr>
        </div>
      )}
    </nav>
  );
}

function BookingNav() {
  return (
    <nav className="flex flex-col gap-2 z-20  lg:px-0 sm:px-4 xl:max-w-9/12 lg:max-w-11/12 mx-auto ">
      <div className="">
        <ul className="p-2 flex justify-between items-center">
          <li>
            <a href="#">
              <p className=" font-heading text-primary text-2xl">
                Airport to Hotels
              </p>
            </a>
          </li>
          <li className="flex cursor-pointer items-center gap-4">
            <CurrencyDropdown />
            {/* Whatsapp Icon */}
            <a
              href="https://api.whatsapp.com/send?phone=905540161923"
              aria-label="whatsapp link"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-10 aspect-square p-1.5 bg-primary rounded-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.50002 12C3.50002 7.30558 7.3056 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C10.3278 20.5 8.77127 20.0182 7.45798 19.1861C7.21357 19.0313 6.91408 18.9899 6.63684 19.0726L3.75769 19.9319L4.84173 17.3953C4.96986 17.0955 4.94379 16.7521 4.77187 16.4751C3.9657 15.176 3.50002 13.6439 3.50002 12ZM12 1.5C6.20103 1.5 1.50002 6.20101 1.50002 12C1.50002 13.8381 1.97316 15.5683 2.80465 17.0727L1.08047 21.107C0.928048 21.4637 0.99561 21.8763 1.25382 22.1657C1.51203 22.4552 1.91432 22.5692 2.28599 22.4582L6.78541 21.1155C8.32245 21.9965 10.1037 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5ZM14.2925 14.1824L12.9783 15.1081C12.3628 14.7575 11.6823 14.2681 10.9997 13.5855C10.2901 12.8759 9.76402 12.1433 9.37612 11.4713L10.2113 10.7624C10.5697 10.4582 10.6678 9.94533 10.447 9.53028L9.38284 7.53028C9.23954 7.26097 8.98116 7.0718 8.68115 7.01654C8.38113 6.96129 8.07231 7.046 7.84247 7.24659L7.52696 7.52195C6.76823 8.18414 6.3195 9.2723 6.69141 10.3741C7.07698 11.5163 7.89983 13.314 9.58552 14.9997C11.3991 16.8133 13.2413 17.5275 14.3186 17.8049C15.1866 18.0283 16.008 17.7288 16.5868 17.2572L17.1783 16.7752C17.4313 16.5691 17.5678 16.2524 17.544 15.9269C17.5201 15.6014 17.3389 15.308 17.0585 15.1409L15.3802 14.1409C15.0412 13.939 14.6152 13.9552 14.2925 14.1824Z"
                    fill="#ffffff"
                  ></path>
                </g>
              </svg>
            </a>
          </li>
        </ul>
        <hr className="mx-2 text-primary"></hr>
      </div>
    </nav>
  );
}
function DesktopNav() {
  return (
    <nav className="hidden sm:flex sm:flex-col pt-5 items-center z-20 gap-6 w-full lg:px-0 sm:px-4 xl:max-w-9/12 lg:max-w-11/12 mx-auto ">
      <ul className="flex justify-between items-center w-full">
        <li>
          <a href="/OakTravel">
            <h1 className="text-base-100 text-3xl hover:text-warning transition-all ">
              Airport to Hotels
            </h1>
          </a>
        </li>
        <li className="flex items-center gap-4 w-fit cursor-pointer">
          <Image
            src="/images/logos/ToursOfYou.webp"
            width={100}
            height={100}
            alt="Tours of you logo"
            aria-label="Book now button"
            className="w-36  hover:shadow-none hover:text-base-100"
          ></Image>
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
        <ul className="text-base-100 flex justify-evenly w-full">
          {menuItem("Booking", "/booking")}
          {menuItem("Who we are", "#us")}
          {menuItem("Our Vehicles", "#vehicles")}
          {menuItem("Reviews", "#reviews")}
          {menuItem("How to book your ride", "#steps")}
          {menuItem("FAQ", "#FAQ")}
          {menuItem("Contact", "#Contact")}
        </ul>
        <hr className="w-full text-base-100"></hr>
      </div>
    </nav>
  );
}
function menuItem(text: string, link: string) {
  return (
    <li className="font-heading transition-all text-xl lg:text-[1.25rem] md:text-base active:text-warning hover:text-warning">
      <a href={link} aria-label={`Scroll to the ${text} section.`}>
        {text}
      </a>
    </li>
  );
}

export default Navbar;
