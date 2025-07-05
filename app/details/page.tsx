"use client";
{
  /* React imports */
}
import { lazy, memo, useState } from "react";
import useFormVariables from "../(home)/components/useGetLocalVariables";

{
  /* Lazy Loadings */
}
const Steps = lazy(() => import("../components/Steps"));
const PageIndicator = lazy(() => import("../PageIndicator"));
const SummaryCard = lazy(() => import("../extras/SummaryCard"));

{
  /* API Keys and images import */
}
import Navbar from "../components/Navbar";

{
  /* On Form.jsx, there is a submit button and it will push form information to this jsx file and it will be used in Transfer Card  */
}
const Details = memo(function () {
    //Get local variables
    const { setFormVariables, getFormVariables } = useFormVariables();
    const localData = getFormVariables();

    const [firstName,setFirstName] = useState(localData?.firstName ?? "");
    const [lastName,setLastName] = useState(localData?.lastName ?? "");
    const [phone,setPhone] = useState(localData?.phone ?? "");
    const [flightNumber,setFlightNumber] = useState(localData?.flightNumber ?? "");
    const [email,setEmail] = useState(localData?.email ?? "");
    const [message,setMessage] = useState(localData?.message ?? "");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setFormVariables({
        ...localData,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        flightNumber: flightNumber,
        email: email,
        message: message,
      });
    }
    return (
      <>
        <Navbar isBookingPage={true} />
        <div className="flex relative flex-col mt-30 justify-between lg:block xl:max-w-9/12 lg:max-w-11/12 mx-auto">
          <section className="p-4 md:px-4 flex justify-between flex-col-reverse lg:flex-row-reverse gap-4 w-full lg:px-0 ">
            <aside className="flex flex-col gap-3 xl:w-4/12 lg:w-5/12">
              <SummaryCard
                localData={localData}
                img="./images/vito.webp"
                transferType={"ONE WAY"}
                vehicleType={"Mercedes Vito"}
                totalDistance={"370 km"}
                totalTime={"2h 18m"}
                totalPrice={"219.34 $"}
                pickupLocation={localData?.pickupLocation ?? ""}
                extras={localData?.extras ?? []}
                navigateToVehicleFeatures={() => {}}
              />
              {/* Navigation Buttons */}

            </aside>
            <div className="lg:w-full flex flex-col gap-4">
              <div className=" lg:flex lg:flex-col lg:gap-4">
                {/*For page indicator active functionality, later.*/}
                <PageIndicator />
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div className="md:flex md:justify-between gap-2 ">
                    <fieldset className="fieldset w-full flex focus-within:outline-0">
                      <legend className="font-bold text-sm lg:text-base">
                        First Name <span className="text-warning">*</span>
                      </legend>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        autoComplete="given-name"
                        className="bg-base-300 h-10 p-2 w-full shadow-sm lg:text-base"
                        placeholder="First Name"
                        required = {true}
                      />
                    </fieldset>
                    <fieldset className="fieldset w-full flex focus-within:outline-0">
                      <legend className="font-bold text-sm lg:text-base">
                        Last Name <span className="text-warning">*</span>
                      </legend>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        autoComplete="family-name"
                        className="bg-base-300 h-10 w-full p-2 shadow-sm lg:text-base"
                        placeholder="Last Name"
                        required
                      />
                    </fieldset>
                  </div>
                  <fieldset className="fieldset flex focus-within:outline-0">
                    <legend className="font-bold text-sm lg:text-base">
                      Phone Number <span className="text-warning">*</span>
                    </legend>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      autoComplete="tel"
                      className="bg-base-300 h-10 p-2 w-full shadow-sm lg:text-base"
                      placeholder="+00 000 000 00 00"
                      required
                    />
                  </fieldset>

                  <fieldset className="fieldset flex focus-within:outline-0">
                    <legend className="font-bold text-sm lg:text-base">
                      Flight Number  <span className="text-warning">*</span>
                    </legend>
                    <input
                      type="text"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                      autoComplete="number"
                      className="bg-base-300 h-10 p-2 w-full shadow-sm lg:text-base"
                      placeholder="AA1234"
                      required
                    />
                  </fieldset>
                  <fieldset className="fieldset flex focus-within:outline-0">
                    <legend className="font-bold text-sm lg:text-base">
                      Email
                    </legend>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      className="bg-base-300 h-10 w-full p-2 shadow-sm lg:text-base"
                      placeholder="Email"
                      required
                    />
                  </fieldset>
                  <fieldset className="">
                    <legend className=" font-bold">
                      Message <span className="text-warning">*</span>
                    </legend>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="bg-base-300 h-32 w-full p-2 shadow-sm lg:text-base"
                      placeholder="Leave us a message..."
                    />
                  </fieldset>
                  <fieldset className="sm:w-fit flex justify-between">
                    <button type="button" className="btn w-[45%] sm:w-16 sm:px-0 md:w-full btn-gray">
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
                          d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                        />
                      </svg>
                      Extras
                    </button>
                    <button type="submit" className="btn w-[45%] sm:w-16 md:w-full btn-warning text-base-100">
                      Booking Summary
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
                          d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                        />
                      </svg>
                    </button>
                  </fieldset>
                </form>
              </div>
            </div>
          </section>
          <div className="[&>section]:max-w-full">
            <Steps />
          </div>
        </div>
      </>
    );
});

export default Details;
