import { useEffect } from "react";
import { createSiteExperience } from "../animations/referenceEngine";

let hasInitialized = false;

/** Mount the original choreography only after React and the display fonts are ready. */
export function useSiteExperience(root) {
  useEffect(() => {
    let cancelled = false;
    let dispose;
    let timeout;
    let frame;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) root.current?.classList.add("reduce-motion");

    const ready = Promise.race([
      document.fonts.ready,
      new Promise((resolve) => {
        timeout = window.setTimeout(resolve, 3500);
      }),
    ]);

    ready.then(() => {
      if (cancelled) return;
      frame = requestAnimationFrame(() => {
        if (cancelled) return;
        const firstLoad = !hasInitialized;
        dispose = createSiteExperience({ initialLoad: firstLoad });
        hasInitialized = true;
        root.current?.setAttribute("data-experience-ready", "");
        // Honour deep links such as /#process once the page choreography is ready.
        const id = window.location.hash.slice(1);
        const target = id && document.getElementById(id);
        if (target)
          window.setTimeout(
            () =>
              window.__siteLenis
                ? window.__siteLenis.scrollTo(target, { immediate: true })
                : target.scrollIntoView(),
            firstLoad ? 4200 : 900,
          );
      });
    });

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
      dispose?.();
    };
  }, [root]);
}
