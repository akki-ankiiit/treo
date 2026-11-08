import { Suspense, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { routes } from "./data/routes";
import ExperienceShell from "./components/layout/ExperienceShell";
import { useSiteExperience } from "./hooks/useSiteExperience";
import { useContactForm } from "./hooks/useContactForm";

/** Scroll to an in-page section (e.g. #process) through the smooth-scroll instance. */
export function scrollToHash(hash, immediate = false) {
  const el = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!el) return false;
  window.setTimeout(() => {
    if (window.__siteLenis) window.__siteLenis.scrollTo(el, { immediate });
    else el.scrollIntoView({ behavior: immediate ? "auto" : "smooth" });
  }, 350);
  return true;
}

function PageExperience({ Component }) {
  const root = useRef(null);
  useSiteExperience(root);
  const handleSubmit = useContactForm();

  return (
    <div
      ref={root}
      data-barba="wrapper"
      className="transition-wrapper"
      onSubmit={handleSubmit}
    >
      <ExperienceShell />
      <Component />
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="route-loading" role="status" aria-label="Loading TREO Construction">
      <span>
        TREO
        <br />
        CONSTRUCTION
      </span>
    </div>
  );
}

function NotFound() {
  return (
    <main className="not-found">
      <p className="l2">TREO CONSTRUCTION</p>
      <h1 className="h2">
        Page not{" "}
        <br />
        found.
      </h1>
      <a className="h5" href="/">
        Return home ↗
      </a>
    </main>
  );
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const transitioning = useRef(false);
  const route = routes.find(
    (item) =>
      item.path === location.pathname.replace(/\/$/, "") ||
      (item.path === "/" && location.pathname === "/"),
  );
  const [failure, setFailure] = useState(false);

  useEffect(() => {
    document.title = route?.title || "Page not found — TREO Construction";
    transitioning.current = false;
  }, [route]);

  useEffect(() => {
    const handleNavigation = (event) => {
      const anchor = event.target.closest("a[href]");
      if (
        !anchor ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        anchor.hasAttribute("download") ||
        anchor.target === "_blank"
      )
        return;
      const href = anchor.getAttribute("href");
      if (!href || (href.startsWith("#") && !document.getElementById(href.slice(1)))) return;
      const target = new URL(anchor.href);
      if (target.origin !== window.location.origin) return;
      event.preventDefault();
      if (transitioning.current) return;
      if (
        target.pathname === location.pathname &&
        target.search === location.search
      ) {
        if (target.hash && scrollToHash(target.hash)) return;
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      transitioning.current = true;
      gsap.to(document.querySelector("main"), {
        opacity: 0,
        duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? 0
          : 0.8,
        ease: "power2.inOut",
        onComplete: () =>
          navigate(target.pathname + target.search + target.hash),
      });
    };
    document.addEventListener("click", handleNavigation);
    return () => document.removeEventListener("click", handleNavigation);
  }, [location.pathname, location.search, navigate]);

  useEffect(() => {
    const onFailure = () => setFailure(true);
    window.addEventListener("vite:preloadError", onFailure);
    return () => window.removeEventListener("vite:preloadError", onFailure);
  }, []);

  if (failure)
    return (
      <div className="not-found">
        <h1 className="h3">Please refresh</h1>
        <p>A new version of the TREO Construction website is available.</p>
        <button onClick={() => window.location.reload()}>Reload page</button>
      </div>
    );
  if (!route) return <NotFound />;

  return (
    <Suspense fallback={<LoadingScreen />}>
      <PageExperience key={location.pathname} Component={route.Component} />
    </Suspense>
  );
}
