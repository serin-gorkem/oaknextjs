import React from "react";

const PolicyContent = () => {
  return (
    <div className="xl:max-w-9/12 lg:max-w-11/12 mx-auto my-20  flex flex-col p-2 md:p-6 lg:p-2 space-y-8 text-gray-800">
      {/* === Pre-Information Form === */}
      <section>
        <h1 className="text-2xl font-semibold mb-4">Pre-Information Form</h1>
        <hr className="border-gray-300 my-2"></hr>
        <p className="mb-2">
          This form provides preliminary information about the service you are purchasing, 
          including its scope, pricing, cancellation rights, and payment obligations.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            All transportation services are subject to the details confirmed in your booking.
          </li>
          <li>
            Prices include VAT and all mandatory fees unless otherwise specified.
          </li>
          <li>
            Payment details and method are selected securely during the booking process.
          </li>
          <li>
            Personal data is processed according to applicable data protection regulations.
          </li>
        </ul>
      </section>

      {/* === Cancellation & Refund Policy === */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Cancellation & Refund Policy</h2>
        <hr className="border-gray-300 my-2"></hr>
        <p className="mb-2">
          Our cancellation and refund terms ensure transparency and fairness for all bookings.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Cancellations made at least <strong>24 hours before the scheduled transfer</strong> 
            are eligible for a full refund.
          </li>
          <li>
            Cancellations made within <strong>24 hours of the scheduled transfer</strong> are 
            non-refundable.
          </li>
          <li>
            No-shows or incorrect booking details resulting in service failure are non-refundable.
          </li>
          <li>
            Refunds, if applicable, will be processed using the original payment method within 
            5-10 business days.
          </li>
        </ul>
        <p className="mt-4 text-sm text-gray-600">
          For any clarification or support regarding cancellations, please contact our customer
          service team at <a href="mailto:info@airporttohotels.com" className="text-primary underline">info@airporttohotels.com</a>.
        </p>
      </section>
    </div>
  );
};

export default PolicyContent;
