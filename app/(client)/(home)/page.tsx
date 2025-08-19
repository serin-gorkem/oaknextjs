import About from "./About";
import ChooseUs from "./ChooseUs";
import Contact from "./Contact";
import FAQ from "./FAQ";
import Home from "./Home";
import PageDivider from "./components/PageDivider";
import Reviews from "./Reviews";
import Steps from "../components/Steps";
import Vehicles from "./Vehicles";
import { Suspense } from "react";

export default function Landing() {
  return (
    <>
    <Suspense fallback={<div className="h-screen">Loading...</div>}>
      <Home />
      <PageDivider />
      <ChooseUs />
      <PageDivider />
      <About />
      <PageDivider />
      <Vehicles />
      <PageDivider />
      <Reviews />
      <PageDivider />
      <Steps />
      <PageDivider />
      <FAQ />
      <PageDivider />
      <Contact />
      <PageDivider />
    </Suspense>
    </>
  );
}
