import Image from "next/image";
import { memo } from "react";

const Footer = memo(function () {
  return (
    <footer className="bg-info-content pt-12 pb-2 relative ">
      <div className="footer sm:footer-horizontal xl:max-w-9/12 lg:max-w-11/12 lg:px-0 sm:px-4 px-2 mx-auto text-neutral-content">
        <div>
          <h1 className="text-2xl text-base-300 font-bold">
            Airport to Hotels
          </h1>
          <p className="w-10/12 text-sm">
            Located in Turkey/Kusadasi; we provide reliable and comfortable
            airport transfers, with transparent pricing and professional
            drivers, we ensure a smooth and stress-free journey all around the
            Turkey.
          </p>
        </div>
        <nav>
          <h1 className="footer-title underline underline-offset-8 decoration-warning text-base-300 ">
            Browse
          </h1>
          <ul className="text-base-100 w-full">
            {menuItem("Home", "/")}
            {menuItem("About Us", "#about")}
            {menuItem("FAQ", "#FAQ")}
            {menuItem("How to book your ride", "#steps")}
            {menuItem("Contact", "#Contact")}
          </ul>
        </nav>
        <nav>
          <h6 className="footer-title underline underline-offset-8 decoration-warning text-base-300">
            Our Services
          </h6>
          <ul className="text-base-100 w-full">
            {menuItem("Booking and Cancelation Policy", "/policy")}
            {menuItem("Privacy Policy", "/privacy")}
            {menuItem("Our Vehicles", "#vehicles")}
            {menuItem("Price List", "/prices")}
            {menuItem("Our Turkey Tours", "https://www.toursofyou.com/")}
            {menuItem("TURSAB Digital Verification System", "/")}
          </ul>
        </nav>
        <nav>
          <h1 className="footer-title underline underline-offset-8 decoration-warning text-base-300">
            Contact
          </h1>
          <ul className="text-base-100 w-full flex flex-col gap-2">
            <li className="link-hover">
              <div className="flex items-center gap-2 ">
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
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
                <a href="0090 256 999 16 19" className=" text-xs lg:text-base">
                  0090 256 999 16 19
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-2 ">
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
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                <p className=" text-xs lg:text-base">
                  You can email us from the contact form
                </p>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 opacity-80"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                <p className=" text-xs lg:text-base">
                  Based in Kusadasi, Turkey
                </p>
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex sm:flex-row flex-col sm:items-center gap-2 sm:gap-0 mt-4 sm:justify-between bottom-4 xl:max-w-9/12 lg:max-w-11/12 lg:px-0 sm:px-4 px-2 mx-auto text-neutral-content">
        <div className="flex items-center gap-2">
          <p className="text-sm">Airport to Hotels is a company of </p>
          <Image
            src="/images/logos/Logo-oak.webp"
            alt="OAK Travel Group Logo"
            width={50}
            height={50}
          ></Image>
        </div>
          <p className="text-sm">© 2020-{new Date().getFullYear()} All rights reserved to OAK Travel Group</p>
      </div>
      <div className="flex sm:flex-row flex-col sm:items-center gap-2 sm:gap-0 mt-4 sm:justify-between bottom-4 xl:max-w-9/12 lg:max-w-11/12 lg:px-0 sm:px-4 px-2 mx-auto text-neutral-content">
        <a className="text-sm" href="https://gorkemserin.com/">
          Website Designed by Crehera Web Agency - Görkem Serin
        </a>
      </div>
    </footer>
  );
});
function menuItem(text: string, link: string) {
  return (
    <li className="link lg:text-base link-hover my-1">
      <a href={link} aria-label={`Scroll to the ${text} section.`}>
        {text}
      </a>
    </li>
  );
}
export default Footer;
