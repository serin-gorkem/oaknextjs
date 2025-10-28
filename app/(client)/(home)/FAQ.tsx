import Image from "next/image";
import { memo } from "react";

const FAQ = memo(function () {
  return (
    <section
      id="FAQ"
      className="h-fit mt-16 px-2 pb-8 flex flex-col lg:p-0 xl:max-w-9/12 lg:max-w-11/12 mx-auto gap-8 lg:gap-16"
    >
      <figure className="flex flex-col gap-2.5">
        <figcaption className="text-xl title lg:text-2xl text-warning font-bold font-heading leading-tight">
          FAQ
        </figcaption>
        <h1 className="text-2xl lg:text-4xl font-bold opacity-85">
          Frequently Asked Questions
        </h1>
      </figure>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-4">
        <div className="flex flex-col justify-between ">
          <FAQElement
            title="What is Airport to Hotels and what services do you provide?"
            text="Airport to Hotels offers private and shared transfers between airports and hotels across Turkey. Our mission is to provide seamless, reliable, and comfortable rides so that your arrival and departure are stress-free. We operate with licensed vehicles and professional drivers."
          />
          <FAQElement
            title="Which airports and destinations do you cover?"
            text="We currently operate transfers at major Turkish airports including Istanbul Airport, Sabiha Gökçen, İzmir Adnan Menderes, Bodrum Milas, Dalaman, Antalya, Kayseri (Erkilet), Nevşehir Kapadokya, Esenboğa, Adana Şakirpaşa, Şanlıurfa (GAP) and Trabzon. We deliver door-to-door service from airport → hotel or hotel → airport within Turkey."
          />
          <FAQElement
            title="Can I request additional services (child seats, extra luggage, VIP)?"
            text="Yes. During the booking process you may add optional extras such as child seats, extra luggage space, or a VIP chauffeur service. These options help tailor the ride to your needs."
          />
          <FAQElement
            title="What are your rates, and are there hidden fees?"
            text="We believe in clear & transparent pricing. The price shown when booking is the total you’ll pay — no hidden fees or surprises."
          />
        </div>
        <Image
          src="/images/faq.webp"
          alt="FAQ"
          width={1920}
          height={1080}
          className="rounded-box w-full h-96 object-cover -z-5"
        ></Image>
      </div>
      <div className="flex flex-col items-center gap-3">
        <h2 className=" text-xl md:text-2xl font-bold">
          Still have questions ?
        </h2>
        <p className="text-base md:text-lg">
          Please contact with our support team, we’re happy to help!
        </p>
        <button className="btn btn-outline px-8 btn-lg"> Contact Us</button>
      </div>
    </section>
  );
});

type FAQElementProps = {
  title: string;
  text: string;
};

function FAQElement(props: FAQElementProps) {
  return (
    <div className="collapse collapse-arrow join-item border-primary border">
      <input
        aria-label="faq-element"
        type="radio"
        name="my-accordion-4"
        defaultChecked
      />
      <div className="collapse-title font-semibold">{props.title}</div>
      <div className="collapse-content text-sm">{props.text}</div>
    </div>
  );
}

export default FAQ;
