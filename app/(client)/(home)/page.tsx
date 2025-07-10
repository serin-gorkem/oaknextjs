import About from "./About";
import ChooseUs from "./ChooseUs";
import Contact from "./Contact";
import FAQ from "./FAQ";
import Home from "./Home";
import PageDivider from "./components/PageDivider";
import Reviews from "./Reviews";
import Steps from "../components/Steps";
import Vehicles from "./Vehicles";

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
