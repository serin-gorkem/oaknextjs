import React from "react";

const PolicyContent = () => {
  return (
    <div className="xl:max-w-9/12 lg:max-w-11/12 mx-auto my-20 flex flex-col p-2 md:p-6 lg:p-2 space-y-8 text-gray-800">
      {/* === Service Delivery === */}
      <section>
        <h1 className="text-2xl font-semibold mb-4">Service Delivery</h1>
        <hr className="border-gray-300 my-2" />
        <p className="mb-2">
          All transportation services booked through{" "}
          <strong>Airport to Hotels</strong> are provided at the date, time, and
          location confirmed in your booking.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Your driver will meet you at the designated pickup point specified
            during checkout.
          </li>
          <li>
            If any operational issues or delays occur, our team will promptly
            notify you and arrange an alternative vehicle or a full refund.
          </li>
          <li>
            The service is considered <strong>delivered</strong> once the
            passenger has been picked up and the transfer has started.
          </li>
        </ul>
      </section>

      {/* === Pre-Information Form === */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Pre-Information Form</h2>
        <hr className="border-gray-300 my-2" />
        <p className="mb-2">
          This form provides preliminary information about the service you are
          purchasing, including its scope, pricing, cancellation rights, and
          payment obligations.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            All transportation services are subject to the details confirmed in
            your booking.
          </li>
          <li>
            Prices include VAT and all mandatory fees unless otherwise
            specified.
          </li>
          <li>
            Payment details and method are selected securely during the booking
            process.
          </li>
          <li>
            Personal data is processed according to applicable data protection
            regulations.
          </li>
        </ul>
      </section>

      {/* === Cancellation & Refund Policy === */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Cancellation & Refund Policy
        </h2>
        <hr className="border-gray-300 my-2" />
        <p className="mb-2">
          Our cancellation and refund terms ensure transparency and fairness for
          all bookings.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Cancellations made at least{" "}
            <strong>24 hours before the scheduled transfer</strong>
            are eligible for a full refund.
          </li>
          <li>
            Cancellations made within{" "}
            <strong>24 hours of the scheduled transfer</strong> are
            non-refundable.
          </li>
          <li>
            No-shows or incorrect booking details resulting in service failure
            are non-refundable.
          </li>
          <li>
            Refunds, if applicable, will be processed using the original payment
            method within 5–10 business days.
          </li>
        </ul>
        <p className="mt-4 text-sm text-gray-600">
          For any clarification or support regarding cancellations, please
          contact our customer service team at{" "}
          <a
            href="mailto:info@airporttohotels.com"
            className="text-primary underline"
          >
            info@airporttohotels.com
          </a>
          .
        </p>
      </section>

      {/* === Distance Sales Agreement === */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Distance Sales Agreement
        </h2>
        <hr className="border-gray-300 my-2" />
        <p>
          This agreement has been prepared in accordance with the provisions of
          the Turkish Law on Consumer Protection (Law No. 6502) and the
          Regulation on Distance Contracts. It defines the rights and
          obligations of the parties regarding the sale and delivery of transfer
          services performed through the website{" "}
          <a
            href="https://www.airporttohotels.com"
            className="text-primary underline"
          >
            www.airporttohotels.com
          </a>
          .
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">1. Parties</h3>
        <p>
          <strong>Service Provider (Seller):</strong> Airport to Hotels
          <br />
          Address: OAK TRAVEL
          <br />
          E-mail:{" "}
          <a
            href="mailto:info@airporttohotels.com"
            className="text-primary underline"
          >
            info@airporttohotels.com
          </a>
          <br />
          Phone: {process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER}
        </p>
        <p className="mt-2">
          <strong>Customer (Buyer):</strong> The natural person who books a
          transfer service through the website and completes payment
          electronically.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">2. Subject</h3>
        <p>
          This agreement covers the rights and obligations of the parties
          regarding the electronic booking and sale of transfer or
          transportation services provided by Airport to Hotels through its
          website.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">
          3. Service Information
        </h3>
        <p>
          The main characteristics of the booked service, including the transfer
          route, vehicle type, number of passengers, service date, time, and
          total price, are detailed on the booking confirmation page.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">
          4. Delivery / Performance
        </h3>
        <p>
          Airport to Hotels undertakes to provide the booked service at the
          date, time, and location confirmed by the Buyer. The service is
          considered completed once the passenger has been picked up and the
          transfer has started.
          <br />
          If the Seller fails to provide the service as agreed, the Buyer is
          entitled to a full refund or equivalent alternative service.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">
          5. Right of Withdrawal
        </h3>
        <p>
          The Buyer may cancel the booking without penalty up to{" "}
          <strong> 24 hours before</strong> the scheduled service time.
          <br />
          Cancellations made within 24 hours of the scheduled pickup or after
          the service has started are non-refundable.
          <br />
          To exercise this right, the Buyer must contact{" "}
          <a
            href="mailto:info@airporttohotels.com"
            className="text-primary underline"
          >
            info@airporttohotels.com
          </a>
          .
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">
          6. Refund Conditions
        </h3>
        <p>
          When the Buyer cancels within the permitted time frame, the full
          payment will be refunded within <strong>5–10 business days</strong> to
          the original payment method. For credit card transactions, the time
          for the refund to appear on the account may vary depending on the
          Buyer’s bank.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">
          7. Dispute Resolution
        </h3>
        <p>
          Any disputes arising from this agreement shall be settled in
          accordance with Turkish Law, and the Consumer Arbitration Committees
          or Consumer Courts in the Buyer’s place of residence shall have
          jurisdiction.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">8. Enforcement</h3>
        <p>
          By confirming their booking and making payment on{" "}
          <a
            href="https://www.airporttohotels.com"
            className="text-primary underline"
          >
            www.airporttohotels.com
          </a>
          , the Buyer acknowledges that they have read, understood, and agreed
          to all terms of this Distance Sales Agreement.
        </p>
      </section>
    </div>
  );
};

export default PolicyContent;