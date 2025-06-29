import About from "./components/About";
import ChooseUs from "./components/ChooseUs";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";
import Home from "./components/Home";
import PageDivider from "./components/PageDivider";
import Reviews from "./components/Reviews";
import Steps from "./components/Steps";
import Vehicles from "./components/Vehicles";

export default function Landing() {
  return (
    <>
      <Home />
      <PageDivider/>
      <ChooseUs/>
      <PageDivider/>
      <About/>
      <PageDivider/>
      <Vehicles/>
      <PageDivider/>
      <Reviews/>
      <PageDivider/>
      <Steps/>
      <PageDivider/>
      <FAQ/>
      <PageDivider/>
      <Contact/>
      <PageDivider/>
    </>
  );
}
