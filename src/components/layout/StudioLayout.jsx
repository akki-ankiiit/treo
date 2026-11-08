import HeaderLogo from "../apartmentspage/HeaderLogo";
import Navigation from "../contactpage/Navigation";
import MenuModal from "../contactpage/MenuModal";
import CallModal from "./CallModal";
import Footer from "./Footer";
import SeaViews from "../home/SeaViews";
export default function StudioLayout({
  children,
  breadcrumb = "Portfolio",
  showCta = true,
}) {
  return (
    <main
      data-barba="container"
      data-barba-namespace="studio"
      className="transition-container"
    >
      <HeaderLogo />
      <Navigation />
      <div className="header-cramps">
        <a href="/projects" className="l2 studio-breadcrumb">
          {breadcrumb}
        </a>
      </div>
      {children}
      {showCta && <SeaViews />}
      <Footer />
      <CallModal />
      <MenuModal />
    </main>
  );
}
