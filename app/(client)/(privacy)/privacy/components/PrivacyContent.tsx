import React from "react";

const PrivacyContent = () => {
  return (
    <div className="xl:max-w-9/12 lg:max-w-11/12 mx-auto my-20 flex flex-col p-2 md:p-6 lg:p-2 space-y-10 text-gray-800 leading-relaxed">
      {/* === Privacy Policy === */}
      <section>
        <h1 className="text-3xl font-semibold mb-4">Privacy Policy</h1>
        <hr className="border border-gray-300 mb-6" />

        <p>
          This site <strong>Oak Travel Agency – Oak Turizm Seyahat Acenteliği Otelcilik ve İnş. Ltd. Şti.</strong> 
          (referred to as “we,” “us,” or “our”) is owned and operated by us.
        </p>
        <p>
          This privacy statement does not cover information collected on any of our sites or elsewhere,
          including sites linked from our website.
        </p>
        <p>
          By using the site, you consent to the collection and use of information in accordance with this policy.
          Unless otherwise stated, the terms used here have the same meanings as in our Terms and Conditions
          .
        </p>
      </section>

      {/* === Information Collection and Use === */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Information Collection and Use</h2>
        <p>
          While using our site, we may ask you to provide personally identifiable information
          used to communicate with you, make your reservations, and verify your identity.
          This includes your name, e-mail address, postal address, and phone number.
        </p>
        <p>
          We care deeply about protecting consumer privacy. We only request information
          relevant to the services we provide and never sell, trade, or disclose your personal
          information to third parties.
        </p>
      </section>

      {/* === IP Addresses and Cookies === */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">IP Addresses and Cookies</h2>
        <p>
          We may use visitor IP addresses to optimize search engine visibility or diagnose server issues.
          Additionally, we use Google Analytics to understand how visitors navigate our website and improve
          user experience.
        </p>
        <p>
          Cookies help collect aggregated, non-personal data such as traffic sources, operating systems,
          and browser types. You may disable cookies in your browser settings, but doing so could limit
          site functionality.
        </p>
      </section>

      {/* === Booking and Payment === */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Booking and Payment</h2>
        <p>
          When booking a tour, we request your contact details (name, email, and occasionally address or
          phone number). This information is solely used to communicate about your reservation.
        </p>
        <p>
          In rare cases, your details may be shared with the responsible tour provider.
          We never sell or distribute your personal information.
        </p>
        <p>
          For online payments, we may request your credit card or bank transfer details.
          All transactions are protected by SSL encryption and modern firewalls.
        </p>
      </section>

      {/* === Online Security === */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Online Security</h2>
        <p>
          Our website employs the highest level of SSL encryption to ensure your personal data
          is secure. All collected data is protected by advanced firewalls and security protocols.
        </p>
      </section>

      {/* === Links and Third Parties === */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Links to Other Sites</h2>
        <p>
          Our site may contain links to third-party sites. We are not responsible for the privacy
          practices or content of external websites. Please review their privacy policies when visiting
          them.
        </p>
      </section>

      {/* === Google Analytics === */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Google Analytics</h2>
        <p>
          Google Analytics collects anonymous usage data, including order details, product IDs,
          total costs, and user activity for performance tracking.
        </p>
      </section>

      {/* === Contact === */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Contact</h2>
        <p>
          If you have any questions regarding this Privacy Policy, please contact us immediately at{" "}
          <a href="mailto:info@airporttohotels.com" className="text-blue-600 hover:underline">
            info@airporttohotels.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default PrivacyContent;
