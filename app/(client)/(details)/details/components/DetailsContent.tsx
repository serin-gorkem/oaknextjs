"use client";
{
  /* React imports */
}
import { lazy, memo, Suspense, useEffect, useState } from "react";
import { useGetData } from "../../../components/GetData";
import { UpdateData } from "../../../components/UpdateData";
import { useRouter } from "next/navigation";
import SessionExpiredFallback from "@/app/(client)/components/SessionExpiredFallback";

{
  /* Lazy Loadings */
}
const Steps = lazy(() => import("../../../components/Steps"));
const PageIndicator = lazy(() => import("../../../components/PageIndicator"));
const SummaryCard = lazy(
  () => import("../../../components/SummaryCard")
);

type FormData = {
  name: string;
  lastName: string;
  phone: string;
  flightNumber?: string;
  email: string;
};

function validateForm(data: FormData) {
  const errors: Partial<Record<keyof FormData, string>> = {};

  const nameRegex = /^[a-zA-ZçÇğĞıİöÖşŞüÜ\s]{2,}$/;
  const phoneRegex = /^(\+?\d{10,15})$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.name.trim()) {
    errors.name = "Name is required.";
  } else if (!nameRegex.test(data.name.trim())) {
    errors.name =
      "Name must contain only letters and be at least 2 characters.";
  }

  if (!data.lastName.trim()) {
    errors.lastName = "Last name is required.";
  } else if (!nameRegex.test(data.lastName.trim())) {
    errors.lastName =
      "Last name must contain only letters and be at least 2 characters.";
  }

  const sanitizedPhone = data.phone.replace(/\s+/g, "");
  if (!sanitizedPhone) {
    errors.phone = "Phone number is required.";
  } else if (!phoneRegex.test(sanitizedPhone)) {
    errors.phone = "Invalid phone number format.";
  }
  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = "Invalid email format.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

const Details = memo(function () {
  const { clientData, setClientData, error } = useGetData();

  // Controlled form input states
  const [firstName, setFirstName] = useState(clientData?.details?.name || "");
  const [lastName, setLastName] = useState(clientData?.details?.lastName || "");
  const [phoneNumber, setPhoneNumber] = useState(
    clientData?.details?.phone || ""
  );
  const [flightNumber, setFlightNumber] = useState(
    clientData?.details?.flightNumber || ""
  );
  const [email, setEmail] = useState(clientData?.details?.email || "");
  const [message, setMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState<any>("");

  console.log("Client Data: ",clientData);
  

  const router = useRouter();
  function handleNavigateToExtras() {
    router.push(`/extras?uuid=${clientData.uuid}`);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validation = validateForm({
      name: firstName,
      lastName,
      phone: phoneNumber,
      flightNumber,
      email,
    });


    if (validation.isValid) {
      updateClientData({
        name: firstName,
        lastName: lastName,
        phone: phoneNumber,
        flightNumber,
        email,
        message: message,
      });
      router.push(`/summary?uuid=${clientData.uuid}`);
    }
    setIsFormValid(validation);
  }

  function updateClientData(changes: Partial<typeof clientData> = {}) {
    setClientData((prev: any) => {
      const base = prev || {};
      return {
        ...base,
        details: {
          ...(base.details || {}),
          ...changes,
        },
      };
    });
  }

  useEffect(() => {
    if (!clientData || !clientData.uuid) return;
    UpdateData({ clientData });
    console.log("clientData updated:", clientData);
  }, [clientData]);

  useEffect(() => {
    if (clientData !== null) {
      setFirstName(clientData.details.name);
      setLastName(clientData.details.lastName);
      setPhoneNumber(clientData.details.phone);
      setFlightNumber(clientData.details.flightNumber);
      setEmail(clientData.details.email);
      setMessage(clientData.details.message);
    }
  }, [clientData]);
  
  if (error || !clientData) {
    return <SessionExpiredFallback error={error} clientData={clientData} />;
  }
    if (!clientData) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-center mt-20">Loading Data...</p>
      </div>
    );
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex relative flex-col mt-20 sm:mt-24 justify-between lg:block xl:max-w-9/12 lg:max-w-11/12 mx-auto">
        <section className="p-4 md:px-4 flex justify-between flex-col-reverse lg:flex-row-reverse gap-4 w-full lg:px-0 ">
          <aside className="flex flex-col gap-3 xl:w-4/12 lg:w-5/12">
            <SummaryCard clientData={clientData} />
            {/* Navigation Buttons */}
            <div className="flex md:flex-wrap gap-2 justify-between w-full">
              <button
                onClick={handleNavigateToExtras}
                className="btn w-5/12 px-0 md:w-full btn-gray"
              >
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
            </div>
          </aside>
          <div className="lg:w-full flex flex-col gap-4">
            <div className=" lg:flex lg:flex-col lg:gap-4">
              {/*For page indicator active functionality, later.*/}
              <PageIndicator activeStep="details"  />
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="md:flex md:justify-between gap-2 ">
                  <fieldset className="fieldset w-full flex focus-within:outline-0">
                    <legend className="font-bold text-sm lg:text-base">
                      First Name <span className="text-warning">*</span>
                    </legend>
                    <input
                      type="text"
                      className="bg-base-300 h-10 p-2 w-full shadow-sm lg:text-base"
                      placeholder="First Name"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </fieldset>
                  <fieldset className="fieldset w-full flex focus-within:outline-0">
                    <legend className="font-bold text-sm lg:text-base">
                      Last Name <span className="text-warning">*</span>
                    </legend>
                    <input
                      type="text"
                      className="bg-base-300 h-10 w-full p-2 shadow-sm lg:text-base"
                      placeholder="Last Name"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </fieldset>
                </div>
                <fieldset className="fieldset flex focus-within:outline-0">
                  <legend className="font-bold text-sm lg:text-base">
                    Phone Number <span className="text-warning">*</span>
                  </legend>
                  <input
                    type="text"
                    className="bg-base-300 h-10 p-2 w-full shadow-sm lg:text-base"
                    placeholder="+00 000 000 00 00"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset flex focus-within:outline-0">
                  <legend className="font-bold text-sm lg:text-base">
                    Flight Number <span className="text-warning">*</span>
                  </legend>
                  <input
                    type="text"
                    className="bg-base-300 h-10 p-2 w-full shadow-sm lg:text-base"
                    placeholder="AA1234"
                    required
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset flex focus-within:outline-0">
                  <legend className="font-bold text-sm lg:text-base">
                    Email
                  </legend>
                  <input
                    type="email"
                    className="bg-base-300 h-10 w-full p-2 shadow-sm lg:text-base"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </fieldset>

                <fieldset>
                  <legend className="font-bold">
                    Message <span className="text-warning">*</span>
                  </legend>
                  <textarea
                    className="bg-base-300 h-32 w-full p-2 shadow-sm lg:text-base"
                    placeholder="Leave us a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </fieldset>

                <button type="submit" className="btn btn-primary w-36">
                  Submit
                </button>

                {isFormValid?.isValid === false && (
                  <fieldset className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    <legend className="font-bold text-sm mb-2">
                      Please fix the following:
                    </legend>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {Object.entries(isFormValid.errors).map(
                        ([field, message]) => (
                          <li key={field}>{String(message)}</li>
                        )
                      )}
                    </ul>
                  </fieldset>
                )}
              </form>
            </div>
          </div>
        </section>
        <div className="[&>section]:max-w-full">
          <Steps />
        </div>
      </div>
    </Suspense>
  );
});

export default Details;