import Image from "next/image";

export default function BookContent() {
  return (
    <section
      id="home"
      className="h-fit my-12 xl:max-w-9/12 lg:max-w-11/12 lg:mx-auto flex flex-col relative sm:gap-5 lg:gap-10"
    >
      <div className="flex justify-between items-center my-12 ">
        <h1 className="text-4xl lg:text-7xl w-5/6 leading-tight title font-bold my-10">
          About <span className="text-warning"> Us</span>
        </h1>
        <div className="w-5/6">
          <p className="text-base lg:text-xl font-medium leading-tight mt-2">
            Our mission is to make your arrival and departure effortless,
            allowing you to start and end your trip with ease.
          </p>
          <p className="text-base lg:text-xl font-medium leading-tight mt-2">
            Our team of licensed and trained professionals is dedicated to
            ensuring safety, punctuality, and customer satisfaction. We operate
            with a modern fleet of luxury vehicles that are regularly maintained
            for maximum comfort and safety on every journey.
          </p>
        </div>
      </div>
      <Image
        src="/images/about_page.webp"
        alt="About Us"
        width={1920}
        height={1080}
        className="rounded-box w-full h-128 object-cover -z-5"
      ></Image>
      <div className="">
      <p className="text-base lg:text-xl font-medium w-5/6 leading-tight mt-4">
        Thanks to our extensive and affordable service network, we offer fast,
        dependable, and cost-effective transportation solutions across the
        region. Whether you're traveling for business or leisure, we are
        committed to providing an exceptional transfer experience. Travel with
        Airport to Hotels for a comfortable, safe, and economical ride from the
        airport directly to your accommodation.
      </p>
      <p className="text-base lg:text-xl font-medium w-5/6 leading-tight mt-4">
        Travel with Airport to Hotels for a comfortable, safe, and economical
        ride from the airport directly to your accommodation.
      </p>
      </div>
    </section>
  );
}
