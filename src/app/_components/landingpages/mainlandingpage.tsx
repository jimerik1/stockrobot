import HeaderLO from "./header";
import HeroSection from "./herosection";
import ProductScreenshot from "./productscreenshot";
import LogoClouds from "./logoclouds";
import PageStats from "./pagestats";


export default async function MainLandingPage() {


  return (
    <div>

    <HeaderLO />
    <HeroSection />
    <LogoClouds />
    <ProductScreenshot />
    <PageStats />

    </div>
  );
}