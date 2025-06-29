import { memo } from "react";

const FAQ = memo(function () {
  return (
    <section
      id="FAQ"
      className="h-fit mt-16 px-2 pb-8 flex flex-col lg:p-0 xl:max-w-9/12 lg:max-w-11/12 mx-auto gap-8 lg:gap-16"
    >
      <figure className="flex flex-col gap-2.5">
        <figcaption className="text-xl lg:text-2xl text-warning font-bold font-heading leading-tight">
          FAQ
        </figcaption>
        <h1 className="text-2xl lg:text-4xl font-bold opacity-85">
          Frequently Asked Questions
        </h1>
      </figure>
      <div className="flex flex-col gap-3">
        <FAQElement
          title="How do I book a hotel?"
          text="To book a hotel, visit our website and select your preferred accommodation. You can also contact our customer support team at 123-456-7890."
        />
        <FAQElement
          title="What are the cancellation policies?"
          text="We offer flexible cancellation policies. If you need to cancel your booking within 24 hours of booking, you will receive a full refund. If you need to cancel after 24 hours, you will be charged a 10% cancellation fee."
        />
        <FAQElement
          title="How do I secure my booking?"
          text="To secure your booking, make sure to use a secure payment method like PayPal or Stripe. Additionally, we recommend using a reputable hotel chain to ensure your stay is as comfortable as possible."
        />
        <FAQElement
          title="How do I secure my booking?"
          text="To secure your booking, make sure to use a secure payment method like PayPal or Stripe. Additionally, we recommend using a reputable hotel chain to ensure your stay is as comfortable as possible."
        />
      </div>
      <div className="flex flex-col items-center gap-3">
        <h2 className=" text-xl md:text-2xl font-bold">
        Still have questions ?
        </h2>
        <p className="text-xs md:text-lg">
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
}


function FAQElement(props: FAQElementProps) {
  return (
    <div className="collapse collapse-arrow join-item border-primary border">
      <input aria-label="faq-element" type="radio" name="my-accordion-4" defaultChecked />
      <div className="collapse-title font-semibold">{props.title}</div>
      <div className="collapse-content text-sm">{props.text}</div>
    </div>
  );
}

export default FAQ;
