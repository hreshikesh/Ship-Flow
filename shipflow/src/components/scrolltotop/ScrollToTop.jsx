import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls window to top on every pathname change.
 * Use behavior: "instant" if you prefer no animation on hard navigations.
 */
export default function ScrollToTop({ behavior = "smooth" }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If URL has a hash (#section), let the browser handle that anchor
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior });
        return;
      }
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior,
    });
  }, [pathname, hash, behavior]);

  return null;
}