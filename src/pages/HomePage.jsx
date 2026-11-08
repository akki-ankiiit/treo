import HomeHeader from "../components/home/HomeHeader";
import Hero from "../components/home/Hero";
import CoastalIntroduction from "../components/home/CoastalIntroduction";
import ThreeReasons from "../components/home/ThreeReasons";
import CommunityQuote from "../components/home/CommunityQuote";
import ConceptAndLocation from "../components/home/ConceptAndLocation";
import CoastalPanorama from "../components/home/CoastalPanorama";
import ResidenceTypes from "../components/home/ResidenceTypes";
import ResidenceIntroduction from "../components/home/ResidenceIntroduction";
import Amenities from "../components/home/Amenities";
import LivingSpaces from "../components/home/LivingSpaces";
import Architecture from "../components/home/Architecture";
import Development from "../components/home/Development";
import SeaViews from "../components/home/SeaViews";
import Footer from "../components/layout/Footer";
import CallModal from "../components/layout/CallModal";
import MenuModal from "../components/layout/MenuModal";
import ArchitecturalTooltips from "../components/layout/ArchitecturalTooltips";
import EmptyTooltips from "../components/layout/EmptyTooltips";
import EmptyModals from "../components/layout/EmptyModals";
export default function HomePage() {
  return (
    <main
      data-barba="container"
      data-barba-namespace="home"
      className="transition-container"
    >
      <HomeHeader />
      <Hero />
      <CoastalIntroduction />
      <ThreeReasons />
      <CommunityQuote />
      <ConceptAndLocation />
      <CoastalPanorama />
      <ResidenceTypes />
      <ResidenceIntroduction />
      <Amenities />
      <LivingSpaces />
      <Architecture />
      <Development />
      <SeaViews />
      <Footer />
      <CallModal />
      <MenuModal />
      <ArchitecturalTooltips />
      <EmptyTooltips />
      <EmptyModals />
    </main>
  );
}
